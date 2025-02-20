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

    const storedEmail = localStorage.getItem('email')
    const storedPassword = localStorage.getItem('password')

    if (storedEmail && storedPassword) {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email: storedEmail,
        password: storedPassword,
      })

      if (supabaseError) {
        setError(supabaseError.message)
      } else if (data) {
        window.location.href = '/dashboard'
      } else {
        console.error('Error: Unknown error occurred')
      }
    } else {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (supabaseError) {
        setError(supabaseError.message)
      } else if (data) {
        // Store email and password locally
        localStorage.setItem('email', email)
        localStorage.setItem('password', password)

        // User is signed in, you can redirect them to the dashboard
        window.location.href = '/dashboard'
      } else {
        console.error('Error: Unknown error occurred')
      }
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
