'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      <nav className='flex min-w-full items-center justify-between p-24'>
        <h1> Welcome to IDLR Landing page!</h1>
          <Link
            href='/signin'
            className='underline hover:text-primary'
          >
            Sign In
          </Link>

          <Link
            href='/signup'
            className='underline hover:text-primary'
          >
            Sign Up
          </Link>

      </nav>
      <div className="relative flex items-center justify-center bg-blue-100 h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-transparent opacity-50 rounded-lg"/>
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
    </div>
  )
}
