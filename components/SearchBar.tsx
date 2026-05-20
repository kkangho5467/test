'use client'

import Link from 'next/link'
import { useState, useEffect, type FormEvent } from 'react'

import type { Post } from '@/lib/posts'

type SearchBarProps = {
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (value: string) => void
  onSearch?: (query: string) => void
  onDelete?: (id: number) => void
  posts?: Post[]
  hideResults?: boolean
}

export default function SearchBar({
  value,
  defaultValue,
  placeholder = '게시글 검색',
  onChange,
  onSearch,
  onDelete,
  posts,
  hideResults = false,
}: SearchBarProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [query, setQuery] = useState('') // last searched query for filtering
  const [visiblePosts, setVisiblePosts] = useState<Post[]>(posts ?? [])

  useEffect(() => {
    if (posts) setVisiblePosts(posts)
  }, [posts])

  useEffect(() => {
    if (isControlled) {
      // when controlled, sync visiblePosts filtering if query exists
    }
  }, [isControlled, value])

  const inputValue = isControlled ? value! : internalValue

  function handleInputChange(v: string) {
    if (isControlled) {
      onChange?.(v)
    } else {
      setInternalValue(v)
      onChange?.(v)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = inputValue.trim()
    setQuery(q.toLowerCase())
    onSearch?.(q)
  }

  const handleDeleteLocal = (id: number) => {
    const ok = confirm('정말 삭제하시겠습니까?')
    if (!ok) return

    if (posts) {
      // parent owns posts: notify parent
      onDelete?.(id)
    } else {
      // internal posts: mutate local state
      setVisiblePosts((cur) => cur.filter((p) => p.id !== id))
      onDelete?.(id)
    }
  }

  const filtered = (visiblePosts ?? []).filter((p) => {
    if (!query) return true
    const q = query.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      (p.author && p.author.toLowerCase().includes(q))
    )
  })

  return (
    <section className="space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row" role="search" aria-label="Search posts">
        <input
          type="search"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-gray-500"
          aria-label="Search posts"
        />
        <button
          type="submit"
          className="inline-flex rounded-lg bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-700"
          aria-label="Search"
        >
          검색
        </button>
      </form>
      {!hideResults && (filtered.length === 0 ? (
        <p className="text-gray-600">검색 결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((post) => (
            <article key={post.id} className="rounded-lg bg-white p-6 shadow transition hover:shadow-lg">
              <div className="space-y-3">
                <Link href={`/posts/${post.id}`} className="block space-y-3">
                  <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>
                  <p className="text-gray-600">{post.content}</p>
                  <div className="space-y-1 text-sm text-gray-400">
                    <p>작성자: {post.author}</p>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteLocal(post.id)}
                  className="inline-flex rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  aria-label={`Delete post ${post.title}`}
                >
                  삭제
                </button>
              </div>
            </article>
          ))}
        </div>
      ))}
    </section>
  )
}