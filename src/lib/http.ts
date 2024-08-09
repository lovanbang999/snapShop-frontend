import envConfig from '@/config'
import { handleErrorApi, isClient, nomalizePath } from './utils'
import { redirect } from 'next/navigation'
import { LoginResType } from '@/schemaValidations/auth.schema'
import { AUTHENTICATION_ERROR_STATUS, ENTITY_ERROR_STATUS } from './constant'
import { EntityError, EntityErrorPayload, HttpError } from './error.http'

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined
}

let clientLogoutRequest: null | Response = null

const request = async <ResponseType>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined

  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeaders: Record<string, string> = body instanceof FormData ? {} : { 'Content-Type': 'application/json' }

  // Check if request in client context get sessionToken from localStorage and then add it to the Authorization feild of baseHeaders
  if (isClient()) {
    const _sessionToken = localStorage.getItem('sessionToken')
    if (_sessionToken) {
      const sessionToken = JSON.parse(_sessionToken)
      baseHeaders.Authorization = `Bearer ${sessionToken}`
    }
  }

  // If baseUrl is not passed (or baseUrl === undefined) then get it from envConfig.NEXT_PUBLIC_API_ENDPOINT
  // If passed baseUrl then get the value has passed. If pass the value "" then vall the API to Next.js Server
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

  // Normalize the url passed in to combine with the baseurl
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    body,
    method
  })

  const payload: ResponseType = await res.json()

  const data = {
    status: res.status,
    payload
  }

  // Interceptor all request and response before return data to the client
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(data as unknown as { status: 422, payload: EntityErrorPayload })
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient()) {
        if (!clientLogoutRequest) {
          try {
            clientLogoutRequest = await fetch('/api/auth/logout', {
              method: 'POST',
              body: JSON.stringify({ force: true }),
              headers: {
                ...baseHeaders
              }
            })
          } catch (error) {
            handleErrorApi({
              error
            })
          } finally {
            localStorage.removeItem('sessionToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
            clientLogoutRequest = null
            location.href = '/login'
          }
        }
      } else {
        const sessionToken = ((options?.headers as any)?.Authorization as string).split(' ')[1]
        redirect(`logout?sessionToken=${sessionToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }

  // Make sure the logic below only run on the client environment
  if (isClient()) {
    if (
      ['login', 'register'].some(item => item === nomalizePath(url))
    ) {
      const { accessToken } = (payload as LoginResType).metaData.tokens
      localStorage.setItem('sessionToken', JSON.stringify(accessToken))
    } else if ('logout' === nomalizePath(url)) {
      localStorage.removeItem('sessionToken')
    }
  }

  return payload
}

const http = {
  async get<ResponseType>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<ResponseType>('GET', url, options)
  },
  async post<ResponseType>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<ResponseType>('POST', url, { ...options, body })
  },
  async put<ResponseType>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<ResponseType>('PUT', url, { ...options, body })
  },
  async patch<ResponseType>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<ResponseType>('PATCH', url, { ...options, body })
  },
  async delete<ResponseType>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<ResponseType>('DELETE', url, { ...options, body })
  }
}

export default http
