import http from '@/lib/http'
import { LoginBodyType, LoginResType, SignUpBodyType, SignUpResType } from '@/schemaValidations/auth.schema'
import { MessageResType } from '@/schemaValidations/common.schema'

export const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/login', body),
  signup: (body: SignUpBodyType) => http.post<SignUpResType>('/register', body),
  auth: ( body: {
    sessionToken: { accessToken: string, refreshToken: string },
    user: { _id: string, username: string, email: string }
  }) =>
    http.post('/api/auth', body, { baseUrl: '' }),
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
    ),
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
    )
}
