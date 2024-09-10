'use client'
import React, { ReactNode } from 'react'
interface CivviesLayoutProps {
  children: ReactNode
}

const CivviesLayout = ({ children }: CivviesLayoutProps) => {
  return (
    <div className="flex flex-col border-2 w-full border-4 border-purple-500">
      Civvie Layout
      {children}
    </div>
  )
}

export default CivviesLayout
