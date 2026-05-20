import { NextResponse } from 'next/server'
import { posts } from '@/lib/posts'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const title = String(body.title ?? '').trim()
    const content = String(body.content ?? '').trim()
    const author = body.author ? String(body.author).trim() : '익명'

    if (!title || !content) {
      return NextResponse.json({ error: 'title and content are required' }, { status: 400 })
    }

    const nextId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1
    const createdAt = new Date().toISOString().slice(0, 10)

    const newPost = {
      id: nextId,
      title,
      content,
      author,
      date: createdAt,
    }

    posts.unshift(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }
}
