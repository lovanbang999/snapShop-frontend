import { z } from 'zod'

export const loginBody = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters'
  }).max(20, {
    message: 'Username must be less than 20 characters '
  }),
  password: z.string().min(3, {
    message: 'Username must be at least 3 characters'
  }).max(20, {
    message: 'Username must be less than 20 characters '
  })
})

export const loginRes = z.object({
  message: z.string(),
  status: z.number(),
  reasonStatusCode: z.string(),
  metaData: z.object({
    user: z.object({
      _id: z.string(),
      username: z.string(),
      email: z.string()
    }),
    tokens: z.object({
      accessToken: z.string(),
      refreshToken: z.string()
    })
  })
})

export type LoginBodyType = z.infer<typeof loginBody>
export type LoginResType = z.infer<typeof loginRes>

export const signUpBody = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters'
  }).max(20, {
    message: 'Username cannot exceed 20 characters'
  }),
  email: z.string().email({ message: 'Your email is invalid format' }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long'
  }).max(50, {
    message: 'Password cannot exceed 50 characters'
  }),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})

const singupRes = z.object({
  message: z.string(),
  status: z.number(),
  reasonStatusCode: z.string(),
  metaData: z.object({
    user: z.object({
      _id: z.string(),
      username: z.string(),
      email: z.string()
    }),
    tokens: z.object({
      accessToken: z.string(),
      refreshToken: z.string()
    })
  })
})

export type SignUpBodyType = z.infer<typeof signUpBody>
export type SignUpResType = z.infer<typeof singupRes>
