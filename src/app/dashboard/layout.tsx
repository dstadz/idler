// components/DashboardLayout.tsx
'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Box, Button, Stack, Typography } from '@mui/material'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import PlanetModal from '@/components/Modal'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
    <Stack className="flex flex-col w-full h-screen border-2 border-green-500">
      <Stack>
        <h1>{session.user.name}s Dashboard</h1>
        <SignOutButton />
      </Stack>

      <Stack flexDirection="row">
        <NavStack />
        <Stack justifyContent="space-between">
          {children}
          <Button onClick={handleOpen}>Open modal</Button>
          <PlanetModal open={open} handleClose={handleClose} />
          <Canvas />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout
