"use client"
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function NewPostMock() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }
    alert('저장 시뮬레이션: ' + title)
    setTitle('')
    setAuthor('')
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold">새 포스트 작성 (Mock)</h2>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
      <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="작성자 (선택)" />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-md border px-3 py-2 min-h-[150px] focus:ring-2 focus:ring-[var(--color-primary)]"
        placeholder="내용"
      />
      <div className="flex gap-2">
        <Button type="submit">저장</Button>
        <Button type="button" variant="secondary" onClick={() => { setTitle(''); setAuthor(''); setContent('') }}>취소</Button>
      </div>
    </form>
  )
}
