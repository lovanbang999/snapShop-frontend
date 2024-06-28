import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
})

if (!configProject.success) {
  // eslint-disable-next-line no-console
  console.log(configProject.error.issues)
  throw new Error('Declared values in .env file is invalid!')
}

const envConfig = configProject.data
export default envConfig
