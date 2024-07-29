import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_HOST: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST
})

if (!configProject.success) {
  // eslint-disable-next-line no-console
  console.log(configProject.error.issues)
  throw new Error('Declared values in .env file is invalid!')
}

const envConfig = configProject.data
export default envConfig
