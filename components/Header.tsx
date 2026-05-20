'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

  const handleSignOut = async () => {
    const { error } = await signOut()

    if (error) {
      alert(error.message)
      return
    }

    router.push('/')
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold">내 블로그</span>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="transition hover:text-gray-300">
            홈
          </Link>
          <Link href="/posts" className="transition hover:text-gray-300">
            블로그
          </Link>

          {loading ? (
            <span className="text-gray-300">인증 확인 중...</span>
          ) : user ? (
            <>
              <Link href="/posts/new" className="transition hover:text-gray-300">
                새 글 쓰기
              </Link>
              <Button type="button" variant="secondary" onClick={handleSignOut} disabled={loading}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="transition hover:text-gray-300">
                로그인
              </Link>
              <Link href="/signup" className="transition hover:text-gray-300">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
