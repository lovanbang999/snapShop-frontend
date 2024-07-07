import http from '@/lib/http'
import { HandleRefreshTokenResType, LoginBodyType, LoginResType, SignUpBodyType, SignUpResType } from '@/schemaValidations/auth.schema'
import { MessageResType } from '@/schemaValidations/common.schema'

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
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) =>
    http.post<MessageResType>(
      '/api/auth/logout',
      {
        force
      },
      {
        baseUrl: '',
        signal
      }
    ),
  logoutFormNextServerToServer: (userId: string, sessionToken: string) =>
    http.post<MessageResType>(
      '/logout',
      {},
      {
        headers: {
          'x-client-id': userId,
          Authorization: `Bearer ${sessionToken}`
        }
      }
    )
}
