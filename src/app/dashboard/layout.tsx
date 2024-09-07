'use client'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/auth/signin')
      console.log(`🚀 ~ file: layout.tsx:14 ~ useEffect ~ session:`, session)
  }, [session, status, router])

  if (status === 'loading' || !session) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>{session.user.name}s Dashboard</h1>
      {children}
    </div>
  )
}
