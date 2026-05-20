import PostsClient from '@/components/PostsClient'
import { posts } from '@/lib/posts'

export default async function PostsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">게시글 목록</h1>
        <p className="text-gray-600">카드를 클릭하면 각 게시글의 상세 페이지로 이동합니다.</p>
      </div>

      {/* Client component manages search state and renders PostCard list */}
      <PostsClient initialPosts={posts} />
    </section>
  )
}