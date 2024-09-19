'use server'
import env from '@/env'

interface Authenticate {
  username: string
  password: string
}

export const authenticate = async ({ password, username }: Authenticate) => {
  if (username !== env.ADM_USERNAME || password !== env.ADM_PASSWORD) {
    return false
  }

  return true
}
