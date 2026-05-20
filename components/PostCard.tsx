"use client"
import React from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { Post } from '@/lib/posts'

type Props = {
  post: Post
  showDelete?: boolean
  onDelete?: (id: number) => void
  className?: string
}

export default function PostCard({ post, showDelete = false, onDelete, className = '' }: Props) {
  const handleDelete = () => {
    if (!onDelete) return
    if (confirm(`정말 "${post.title}"을(를) 삭제하시겠습니까?`)) onDelete(post.id)
  }

  return (
    <Card className={className}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">{post.date}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/posts/${post.id}`} className="text-sm text-[var(--color-primary)] hover:underline">
            보기
          </Link>
          {showDelete && (
            <Button
              variant="secondary"
              onClick={handleDelete}
              className="bg-red-50 text-red-600 hover:bg-red-100"
              aria-label={`Delete post ${post.title}`}
            >
              삭제
            </Button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-700 line-clamp-3">{post.content}</p>
    </Card>
  )
}
