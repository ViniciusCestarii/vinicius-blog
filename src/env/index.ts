import { z } from 'zod'

const envSchema = z.object({
  ADM_USERNAME: z.string(),
  ADM_PASSWORD: z.string(),
  REDIS_URL: z.string().url(),
  REDIS_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

const env = _env.data

export default env
