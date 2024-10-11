'use client'
import React, { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Stack from '@mui/material/Stack'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/signin')
  }, [session, status, router])

  if (status === 'loading' || !session) {
    return <p>Loading...</p>
  }

  if (!session || !session.user) {
    return <div>User not logged in</div>
  }

  return (
    <div className="flex flex-col border-2 w-full">

      <div className="border-2 border-yellow-500">
        <h1>{session.user.name}s Dashboard</h1>
        <SignOutButton />
      </div>

      <Stack flexDirection="row">
        <NavStack />
        {children}
      </Stack>

    </div>
  )
}

export default DashboardLayout
