import envConfig from '@/config'
import { nomalizePath } from './utils'

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined
}

type EntityErrorPayload = {
  message: string
  error: {
    field: string
    message: string
  }[]
}

const ENTITY_ERROR_STATUS: number = 422
const AUTHENTICATION_ERROR_STATUS: number = 401

export class HttpError extends Error {
  status: number
  payload?: {
    message: string,
    [key: string]: any
  }

  constructor({ status, payload }: { status: number, payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload
  constructor({
    status,
    payload
  }: {
    status: 422,
    payload: EntityErrorPayload
  }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

export const isClient = () => typeof window !== 'undefined'

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined

  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeaders: {
    [key: string]: string
  } = body instanceof FormData ? {} : { 'Content-Type': 'application/json' }

  if (isClient()) {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`
    }
  }

  // If baseUrl is not passed (or baseUrl === undefined) then get it from envConfig.NEXT_PUBLIC_API_ENDPOINT
  // If passed baseUrl then get the value has passed. If pass the value "" then vall the API to Next.js Server
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

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

  const payload: Response = await res.json()

  const data = {
    status: res.status,
    payload
  }

  // Interceptor all request and response before return data to the client
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(data as unknown as { status: 422, payload: EntityErrorPayload })
    } else {
      throw new HttpError(data)
    }
  }

  // Make sure the logic below only run on the client environment
  if (isClient()) {
    if (
      ['login', 'signup'].some(item => item === nomalizePath(url))
    ) {

    }
  }

  return data
}

const http = {
  async get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<Response>('GET', url, options)
  },
  async post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<Response>('POST', url, { ...options, body })
  },
  async pur<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<Response>('PUT', url, { ...options, body })
  },
  async delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return await request<Response>('DELETE', url, { ...options, body })
  }
}

export default http
