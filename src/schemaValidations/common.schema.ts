import { z } from 'zod'

export const messageRes = z.object({
  message: z.string()
}).strict()

export type MessageResType = z.infer<typeof messageRes>
