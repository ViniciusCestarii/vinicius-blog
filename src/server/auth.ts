'use server'

import env from '@/env'
import { cookies } from 'next/headers'
import * as jose from 'jose'
export interface Authenticate {
  username: string
  password: string
}

export const authenticate = async ({ password, username }: Authenticate) => {
  if (username !== env.ADM_USERNAME || password !== env.ADM_PASSWORD) {
    return false
  }

  const token = await new jose.SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('3h')
    .sign(new TextEncoder().encode(env.JWT_SECRET))

  cookies().set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  })

  return true
}

export const isAuthenticated = async () => {
  const token = cookies().get('token')

  if (!token) return false

  try {
    await jose.jwtVerify(token.value, new TextEncoder().encode(env.JWT_SECRET))
    return true
  } catch (error) {
    console.error('Authentication failed', error)
    return false
  }
}

export const removeAuthToken = () => {
  cookies().delete('token')
}
