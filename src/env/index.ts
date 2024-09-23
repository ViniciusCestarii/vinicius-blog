import { z } from 'zod'

const envSchema = z.object({
  ADM_USERNAME: z.string(),
  ADM_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  REDIS_URL: z.string().url(),
  REDIS_PASSWORD: z.string(),
  GITHUB_API_URL: z.string().url(),
  GITHUB_ACCESS_TOKEN: z.string(),
  COMMITER_NAME: z.string().default('UPDATE-bot'),
  COMMITER_EMAIL: z.string().default('update-bot@example.com'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

const env = _env.data

export default env
