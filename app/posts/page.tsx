'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import createClient from '@/lib/supabase/client'

type PostRow = {
  id: string
  title: string
  content: string
  created_at: string
  user_id: string
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadPosts = async () => {
      try {
        const supabase = createClient()
        const { data, error: queryError } = await supabase
          .from('posts')
          .select('id, title, content, created_at, user_id')
          .order('created_at', { ascending: false })

        if (!isMounted) return

        if (queryError) {
          setError('불러오기 실패')
          setPosts([])
          return
        }

        setPosts(data ?? [])
      } catch {
        if (!isMounted) return
        setError('불러오기 실패')
        setPosts([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    void loadPosts()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">게시글 목록</h1>
        <p className="text-gray-600">각 글은 상세 페이지로 이동합니다.</p>
      </div>

      {loading ? <p className="text-gray-600">불러오는 중...</p> : null}
      {!loading && error ? <p className="text-gray-600">{error}</p> : null}
      {!loading && !error && posts.length === 0 ? <p className="text-gray-600">게시글이 없습니다.</p> : null}

      {!loading && !error && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  <Link href={`/posts/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="line-clamp-3 text-sm text-gray-600">{post.content}</p>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>ID: {post.id}</p>
                <p>User: {post.user_id}</p>
                <time dateTime={post.created_at}>{post.created_at}</time>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}