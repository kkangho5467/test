import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

import { posts } from '@/lib/posts'

type PostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = posts.find((item) => item.id === Number(id)) ?? null;

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
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--text-muted)]">게시글 번호: {post.id}</p>
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="space-y-1 text-sm text-[var(--text-muted)]">
              <p>작성자: {post.author}</p>
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </div>
          <div>
            <Link href="/posts">
              <Button variant="secondary" className="text-[var(--color-primary)]">목록</Button>
            </Link>
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="leading-7 text-gray-700">{post.content}</p>
        </div>
      </article>
    </Card>
  )
}