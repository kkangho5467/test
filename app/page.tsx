import Link from 'next/link'
import Button from '@/components/ui/Button'
import { posts } from '@/lib/posts'

export default function Home() {
  return (
    <main className="space-y-10 py-12">
      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold">내 블로그</h1>
        <p className="text-lg text-gray-600 mt-2">기록과 생각을 정리해 두는 간단한 블로그입니다.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/posts">
            <Button>글 목록 보기</Button>
          </Link>
          <Link href="/posts/new">
            <Button variant="secondary">새 글 쓰기</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">최근 글</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p) => (
            <article key={p.id} className="p-4 rounded-lg bg-[var(--card-bg)] shadow-sm">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{p.author} · {p.date}</p>
              <p className="mt-3 text-sm text-gray-700 line-clamp-3">{p.content}</p>
              <div className="mt-3">
                <Link href={`/posts/${p.id}`} className="text-[var(--color-primary)] hover:underline">자세히 보기</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
