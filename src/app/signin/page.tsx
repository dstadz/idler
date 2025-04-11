'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (supabaseError) {
        setError(supabaseError.message)
        return
      }

      if (data?.user) {
        // Store email and password locally
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)
        window.location.href = '/dashboard'
      } else {
        setError('Authentication failed. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Sign in error:', err)
    }
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col border-2">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
        {error && <p className="text-red-500">{error}</p>}
        <Link href="/signup">Don&lsquo;t have an account? Sign Up Instead</Link>
      </form>
    </div>
  )
}
