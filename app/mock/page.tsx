import PostsClient from '@/components/PostsClient'
import NewPostMock from '@/components/mockups/NewPostMock'
import { posts } from '@/lib/posts'

export default function MockPage() {
  return (
    <main className="space-y-10 py-8">
      <section className="space-y-4">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          <h1 className="text-4xl font-bold">홈(와이어프레임 목업)</h1>
          <p className="text-gray-600 mt-2">Hero와 최근 포스트 섹션을 미리봅니다.</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((p) => (
              <div key={p.id} className="p-4 rounded-lg border bg-[var(--card-bg)]">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">{p.author} · {p.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">포스트 목록(목업)</h2>
        <PostsClient initialPosts={posts} />
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold">새 포스트 폼(목업)</h2>
        <NewPostMock />
      </section>
    </main>
  )
}
