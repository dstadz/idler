import { LayoutProps } from '@/interfaces'
import React from 'react'
const PlayerLayout = ({ children }: LayoutProps) => (
  <div className='flex flex-col border-2 w-full border-4 border-purple-500'>
    Player Layout
    {children}
  </div>
)

export default PlayerLayout
