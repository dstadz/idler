'use client'
import React, { ReactNode } from 'react'

interface CivviesLayoutProps {
  children: ReactNode
}

const CivviesLayout = ({ children }: CivviesLayoutProps) => {
  return ( // /Civvies
    <div className="flex flex-col border-2 w-full">
      This is the Civvie Page
      {children}
    </div>
  )
}

export default CivviesLayout
