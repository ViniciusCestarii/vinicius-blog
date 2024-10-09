'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    startTransition(async () => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const username = formData.get('username') as string
      const password = formData.get('password') as string

      const success = await login({ username, password })

      if (success) {
        router.push('/')
      } else {
        alert('Authentication failed')
      }
    })

  return (
    <main className="flex flex-col gap-8 max-w-96 mx-auto">
      <h1 className="text-4xl w-full text-center">Login</h1>
      <form
        className="flex flex-col gap-4 max-w-72 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <label>
          <span>Username</span>
          <Input name="username" autoComplete="username" />
        </label>
        <label>
          <span>Password</span>
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </label>
        <Button disabled={isPending} type="submit">
          Login
        </Button>
      </form>
      <p className="text-center">Admin acess is only for Vinicius Cestari 😜</p>
    </main>
  )
}
