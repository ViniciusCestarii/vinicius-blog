'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authenticate } from '@/server/auth'

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const result = await authenticate({ username, password })
    alert(result ? 'Authenticated' : 'Authentication failed')
  }

  return (
    <main className="flex flex-col gap-8">
      <h2 className="text-4xl w-full text-center">Login</h2>
      <form
        className="flex flex-col gap-4 max-w-72 w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <label>
          <span>Email</span>
          <Input name="username" />
        </label>
        <label>
          <span>Password</span>
          <Input type="password" name="password" />
        </label>
        <Button type="submit">Login</Button>
      </form>
    </main>
  )
}
