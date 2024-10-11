'use client'
import React from 'react'
import { LayoutProps } from '@/interfaces'

const CivviesLayout = ({ children }: LayoutProps) => (
  <div className='flex flex-col border-2 w-full border-4 border-purple-500'>
    Civvie Layout
    {children}
  </div>
)

export default CivviesLayout
