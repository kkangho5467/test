import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function Dialog({ children, className = '' }: Props) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/50 ${className}`}>
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">{children}</div>
    </div>
  )
}

export { Dialog }
