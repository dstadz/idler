// components/DashboardLayout.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { Stack } from '@mui/material'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import PlanetModal from '@/components/Modal'
import { moneyAtom, planetAtom } from '@/atoms'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [money] = useAtom(moneyAtom)
  const [planet, setPlanet] = useAtom(planetAtom)
  const handleClose = () => setPlanet(null)

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
          ${money}
          {planet && <PlanetModal open={planet} handleClose={handleClose} />}
          <Canvas />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout
