"use client"
import React, { useState, useMemo, useEffect } from 'react'
import type { Post } from '@/lib/posts'
import SearchBar from '@/components/SearchBar'
import PostCard from '@/components/PostCard'

type Props = { initialPosts: Post[] }

export default function PostsClient({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [query, setQuery] = useState('')

  const handleDelete = (id: number) => {
    setPosts((cur) => cur.filter((p) => p.id !== id))
  }

  useEffect(() => {
    // Listen for posts created elsewhere (other tabs or after API call)
    const listeners: Array<() => void> = []

    if (typeof BroadcastChannel !== 'undefined') {
      if (typeof window !== 'undefined' && !(window as any).__posts_bc_supported) {
        console.log('PostsClient: BroadcastChannel supported')
        ;(window as any).__posts_bc_supported = true
      }
      const bc = new BroadcastChannel('posts')
      const onMessage = (ev: MessageEvent) => {
        try {
          console.log('PostsClient: BroadcastChannel message', ev.data)
          const msg = ev.data
          if (msg?.type === 'created' && msg.post) {
            const incoming = msg.post
            const incomingId = typeof incoming.id === 'string' ? Number(incoming.id) : incoming.id
            setPosts((cur) => {
              if (cur.some((p) => p.id === incomingId)) return cur
              return [{ ...incoming, id: incomingId }, ...cur]
            })
          }
        } catch (e) {
          // ignore
        }
      }
      bc.addEventListener('message', onMessage)
      listeners.push(() => bc.removeEventListener('message', onMessage))
    }

    // storage event fallback for browsers without BroadcastChannel
    const onStorage = (ev: StorageEvent) => {
      try {
        console.log('PostsClient: storage event', ev.key, ev.newValue)
        if (ev.key === 'posts:created' && ev.newValue) {
          const payload = JSON.parse(ev.newValue)
          if (payload?.post) {
            const incoming = payload.post
            const incomingId = typeof incoming.id === 'string' ? Number(incoming.id) : incoming.id
            setPosts((cur) => {
              if (cur.some((p) => p.id === incomingId)) return cur
              return [{ ...incoming, id: incomingId }, ...cur]
            })
          }
        }
      } catch (e) {
        // ignore
      }
    }

    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('storage', onStorage)
      listeners.push(() => window.removeEventListener('storage', onStorage))
    }

    return () => listeners.forEach((fn) => fn())
  }, [])

  const filtered = useMemo(() => {
    if (!query) return posts
    const q = query.toLowerCase()
    return posts.filter((p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || (p.author && p.author.toLowerCase().includes(q)))
  }, [posts, query])

  return (
    <section>
      <SearchBar value={query} onChange={setQuery} onSearch={(q) => setQuery(q)} hideResults />

      {filtered.length === 0 ? (
        <p className="text-gray-600 mt-6">검색 결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          {filtered.map((p) => (
            <PostCard key={p.id} post={p} showDelete onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  )
}
