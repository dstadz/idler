'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { userIdAtom } from '@/atoms';
import { useAtom } from 'jotai';
import AuthModal from '@/components/AuthModal';

export default function Page() {
  const [userId] = useAtom(userIdAtom);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (userId) {
    window.location.href = '/admin' //temp
    return
  }

  return (
    <div>
      <nav className='flex min-w-full items-center justify-between p-24'>
        <h1> Welcome to IDLR Landing page!</h1>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className='underline hover:text-primary'
        >
          Sign In / Sign Up
        </button>
      </nav>
      <div className="relative flex items-center justify-center h-[200px]">
        <div className="absolute inset-0 opacity-50 rounded-lg"/>
        <Image
          className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
          src='/next.svg'
          alt='Next.js PlaceholderLogo'
          width={180}
          height={37}
          priority
        />
      </div>
      <p>The greatest way to pass the time</p>
      <AuthModal
        open={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}
