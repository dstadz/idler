'use client'
import React, { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Stack } from '@mui/material'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import PlanetCanvas from '@/components/canvas/PlanetCanvas'

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
    <Stack className="flex flex-col w-full h-screen border-2 border-red-500">

      <Stack>
        <h1>{session.user.name}s Dashboard</h1>
        <SignOutButton />
      </Stack>

      <Stack flexDirection="row">
        <NavStack />
        <Stack justifyContent="space-between">
          {children}
          <PlanetCanvas />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout
