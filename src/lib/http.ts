import envConfig from '@/config'
import { url } from 'inspector'

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

class HttpError extends Error {
  status: number
  payload?: any

  constructor({ status, payload = undefined }: { status: number, payload?: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: 422
  payload?: any
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

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json'
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
    },
    body,
    method
  })

  const paloay: Response = await res.json()
  const data = {
    status: res.status,
    paloay
  }

  if (!res.ok) {
    throw new HttpError(data)
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
