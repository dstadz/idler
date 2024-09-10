'use client'
import React, { ReactNode } from 'react'

import NavStack from '@/components/NavStack'

interface PlayersLayoutProps {
  children: ReactNode,
}

const PlayersLayout = ({ children }: PlayersLayoutProps) => {
  return ( // /Player
    <div className="flex flex-col border-2 w-full">
      This is the Player Page
      {children}
    </div>
  )
}

export default PlayersLayout
