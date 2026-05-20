'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuth } from '@/contexts/AuthContext'
import createClient from '@/lib/supabase/client'

type PostRow = {
  id: string
  title: string
  content: string
  created_at: string
  user_id: string
}

export default function PostPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [post, setPost] = useState<PostRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadPost = async () => {
      try {
        const supabase = createClient()
        const { data, error: queryError } = await supabase
          .from('posts')
          .select('id, title, content, created_at, user_id')
          .eq('id', params.id)
          .maybeSingle()

        if (!isMounted) return

        if (queryError) {
          setError('불러오기 실패')
          setPost(null)
          return
        }

        setPost(data ?? null)
        setTitle(data?.title ?? '')
        setContent(data?.content ?? '')
      } catch {
        if (!isMounted) return
        setError('불러오기 실패')
        setPost(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (params.id) {
      void loadPost()
    } else {
      setLoading(false)
      setError('게시글을 찾을 수 없습니다')
    }

    return () => {
      isMounted = false
    }
  }, [params.id])

  const isOwner = Boolean(user && post && user.id === post.user_id)

  const handleSave = async () => {
    if (!post) return

    if (!user) {
      setError('로그인이 필요합니다.')
      router.replace('/login')
      return
    }

    if (user.id !== post.user_id) {
      setError('수정 권한이 없습니다.')
      return
    }

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력하세요.')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: updateError } = await supabase
        .from('posts')
        .update({ title: title.trim(), content: content.trim() })
        .eq('id', post.id)

      if (updateError) {
        setError('수정에 실패했습니다. 잠시 후 다시 시도해주세요.')
        return
      }

      router.push('/posts')
    } catch {
      setError('수정에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!post) return

    if (!user) {
      setError('로그인이 필요합니다.')
      router.replace('/login')
      return
    }

    if (user.id !== post.user_id) {
      setError('삭제 권한이 없습니다.')
      return
    }

    const confirmed = window.confirm('정말 삭제할까요?')
    if (!confirmed) return

    setIsDeleting(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: deleteError } = await supabase.from('posts').delete().eq('id', post.id)

      if (deleteError) {
        setError('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.')
        return
      }

      router.push('/posts')
    } catch {
      setError('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return <p className="text-gray-600">불러오는 중...</p>
  }

  if (error) {
    return <p className="text-gray-600">{error}</p>
  }

  if (!post) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">게시글을 찾을 수 없습니다</h1>
        <Link href="/posts" className="inline-flex text-[var(--text-muted)] underline underline-offset-4">
          목록으로 돌아가기
        </Link>
      </section>
    )
  }

  return (
    <Card>
      <article className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--text-muted)]">게시글 번호: {post.id}</p>
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="space-y-1 text-sm text-[var(--text-muted)]">
              <p>User: {post.user_id}</p>
              <time dateTime={post.created_at}>{post.created_at}</time>
            </div>
          </div>
          <div>
            <Link href="/posts">
              <Button variant="secondary" className="text-[var(--color-primary)]">목록</Button>
            </Link>
          </div>
        </div>

        {/* Ch11 RLS가 실제 보안입니다. 이 화면의 버튼 표시는 편의용입니다. */}
        {authLoading ? <p className="text-sm text-gray-600">권한 확인 중...</p> : null}

        {isOwner ? (
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            {isEditing ? (
              <div className="space-y-4">
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
                  <Button type="button" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? '수정 중…' : '수정 저장'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false)
                      setTitle(post.title)
                      setContent(post.content)
                      setError('')
                    }}
                    disabled={isSaving}
                  >
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="prose max-w-none">
                  <p className="leading-7 text-gray-700">{post.content}</p>
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <div className="flex gap-2">
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    수정
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? '삭제 중…' : '삭제'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="leading-7 text-gray-700">{post.content}</p>
          </div>
        )}
      </article>
    </Card>
  )
}