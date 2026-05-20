'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { signInWithEmail } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const { error } = await signInWithEmail(email, password)

      if (error) {
        setErrorMessage(error.message)
        return
      }

      router.push('/posts')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 py-12">
      <div className="space-y-2">
        <p className="text-sm font-medium text-[var(--color-primary)]">Supabase Auth</p>
        <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
        <p className="text-sm text-gray-600">이메일과 비밀번호로 로그인하세요.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              이메일
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {errorMessage ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{errorMessage}</p>
          ) : null}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Card>
    </section>
  )
}
