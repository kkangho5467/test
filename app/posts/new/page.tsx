'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useAuth } from '@/contexts/AuthContext'
import createClient from '@/lib/supabase/client'

export default function NewPostPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login')
    }
  }, [authLoading, router, user])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || authLoading) return

    if (!user) {
      setError('로그인이 필요합니다.')
      router.replace('/login')
      return
    }

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력하세요.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const titleValue = title.trim()
      const contentValue = content.trim()
      const supabase = createClient()
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert({ title: titleValue, content: contentValue, user_id: user.id })
        .select('id')
        .single()

      if (insertError) {
        setError('저장 실패')
        return
      }

      router.push(`/posts/${data.id}`)
    } catch {
      setError('저장 실패')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return <p className="text-gray-600">불러오는 중...</p>
  }

  if (!user) {
    return <p className="text-gray-600">로그인이 필요합니다.</p>
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">새 글 쓰기</h1>
        <p className="text-gray-600">제목과 내용을 입력한 뒤 저장합니다.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              제목
            </label>
            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-gray-500"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? '저장 중…' : '저장'}</Button>
            <Button type="button" variant="secondary" onClick={() => { setTitle(''); setContent(''); setError('') }} disabled={isSubmitting}>취소</Button>
          </div>
        </form>
      </Card>
    </section>
  )
}