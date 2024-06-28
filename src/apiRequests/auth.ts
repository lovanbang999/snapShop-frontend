import http from '@/lib/http'
import { LoginBodyType, LoginResType, SignUpBodyType, SignUpResType } from '@/schemaValidations/auth.schema'

export const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/login', body),
  signup: (body: SignUpBodyType) => http.post<SignUpResType>('/register', body),
  auth: (body: { sessionToken: { accessToken: string, refreshToken: string } }) => http.post('/api/auth', body, {
    baseUrl: ''
  })
}
