'use client'
import React, { ReactNode, useEffect } from 'react'
import SignOutButton from '@/components/SignOutbutton'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/signin')
      console.log(`🚀 ~ file: layout.tsx:14 ~ useEffect ~ session:`, session)
  }, [session, status, router])

  if (status === 'loading' || !session) {
    return <p>Loading...</p>
  }


  if (!session || !session.user) {
    return <div>User not logged in</div>
  }

  return (
    <div>
      <h1>{session.user.name}s Dashboard</h1>
      <SignOutButton />
      {children}
    </div>
  )
}

export default DashboardLayout
