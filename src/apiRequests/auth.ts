import http from '@/lib/http'
import { ExchangeResType, HandleRefreshTokenResType, LoginBodyType, LoginResType, LogoutResType, SignUpBodyType, SignUpResType } from '@/schemaValidations/auth.schema'

export const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/login', body),
  signup: (body: SignUpBodyType) => http.post<SignUpResType>('/register', body),
  refreshTokenFromNextClientToServer: (userId: string, refreshToken: string) =>
    http.post<HandleRefreshTokenResType>(
      '/handlerrefreshtoken',
      {},
      {
        headers: {
          'x-client-id': userId,
          'x-rtoken-id': `Bearer ${refreshToken}`
        }
      }
    ),
  auth: ( body: { sessionToken: string }) => http.post('/api/auth', body, { baseUrl: '' }),
  logoutFormNextClientToNextServer: (
    userId?: string,
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<LogoutResType>(
      '/api/auth/logout',
      {
        force,
        userId
      },
      {
        baseUrl: '',
        signal
      }
    ),
  logoutFormNextServerToServer: (userId: string, sessionToken: string) =>
    http.post<LogoutResType>(
      '/logout',
      {},
      {
        headers: {
          'x-client-id': userId,
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  handleOAtuhCallback: (code: string) =>
    http.post<ExchangeResType>('/auth/exchange', { code })
}
