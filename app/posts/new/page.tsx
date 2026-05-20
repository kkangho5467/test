'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)

    if (!title.trim()) {
      alert('제목을 입력하세요')
      return
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert('저장 실패: ' + (err.error ?? res.statusText))
        return
      }

      const newPost = await res.json().catch(() => null)
      try {
        if (typeof BroadcastChannel !== 'undefined' && newPost) {
          console.log('NewPost: broadcasting via BroadcastChannel', newPost)
          const bc = new BroadcastChannel('posts')
          bc.postMessage({ type: 'created', post: newPost })
          bc.close()
        } else if (typeof window !== 'undefined' && newPost) {
          console.log('NewPost: broadcasting via localStorage', newPost)
          // fallback: write to localStorage to trigger storage event in other tabs
          try {
            const key = 'posts:created'
            localStorage.setItem(key, JSON.stringify({ post: newPost, t: Date.now() }))
            // cleanup shortly after to keep storage tidy
            setTimeout(() => localStorage.removeItem(key), 500)
          } catch (e) {
            // ignore localStorage errors
          }
        }
      } catch (e) {
        // ignore
      }

      router.push('/posts')
    } catch (e) {
      alert('네트워크 오류로 저장하지 못했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">새 글 쓰기</h1>
        <p className="text-gray-600">제목과 내용을 입력한 뒤 저장하면 목록으로 돌아갑니다.</p>
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
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              작성자 (선택)
            </label>
            <Input id="author" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
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

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? '저장 중…' : '저장'}</Button>
            <Button type="button" variant="secondary" onClick={() => { setTitle(''); setContent('') }} disabled={isSubmitting}>취소</Button>
          </div>
        </form>
      </Card>
    </section>
  )
}