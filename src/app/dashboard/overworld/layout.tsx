'use client'
import React from 'react'
import { LayoutProps } from '@/interfaces'

const OverworldsLayout = ({ children }: LayoutProps) => (
  <div className='flex flex-col border-2 w-full border-4 border-purple-500'>
    Overworld Layout
    {children}
  </div>
)

export default OverworldsLayout
