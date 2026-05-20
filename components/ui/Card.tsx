import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div className={`bg-[var(--card-bg)] p-6 rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export { Card }
