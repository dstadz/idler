// components/DashboardLayout.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { Stack } from '@mui/material'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import PlanetModal from '@/components/PlanetModal'
import { moneyAtom, userAtom } from '@/atoms'
import { supabase } from '@/lib/supabase'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter()
  const [money] = useAtom(moneyAtom)
  const [userId, setUserId] = useAtom(userAtom);

  useEffect(() => {
    const { data, error } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`🚀 ~ file: layout.tsx:24 ~ const{data,error}=supabase.auth.onAuthStateChange ~ session:`, session)
      setUserId(session?.user?.id)
    })

    return () => {
      supabase.auth.onAuthStateChange(null)
    }
  }, [setUserId])

  if (!userId) {
    return <div>User not logged in</div>
}

  return (
    <Stack className="flex flex-col w-full h-screen border-2 border-green-500">
      <Stack>
        {/* <h1>{session.user.name}s Dashboard</h1> */}
        <SignOutButton />
      </Stack>

      <Stack flexDirection="row">
        <NavStack />
        <Stack justifyContent="space-between">
          {children}
          ${money}
          <PlanetModal />
          <Canvas />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout
