// components/DashboardLayout.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
import { useAtom } from 'jotai'
import { Stack } from '@mui/material'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import PlanetModal from '@/components/PlanetModal'
import { moneyAtom, userAtom, userIdAtom } from '@/atoms'
import { supabase } from '@/lib/supabase'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // const router = useRouter()
  const [money] = useAtom(moneyAtom)
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  useEffect(() => {
    const { data, error } = supabase
      .auth
      .onAuthStateChange((event, session) => {
      setUserId(session?.user?.id)
    })

    return () => {
      supabase.auth.onAuthStateChange(null)
    }
  }, [setUserId])

  useEffect(() => {
    if (!userId) return
    const fetchData = async () => {
      const { data: users, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)

      if (dbError) {
        console.error("Database error:", dbError)
      } else {
        setUser(users[0])
      }
    }
    fetchData()
  }, [userId, supabase])

  if (!userId) {
    return <div>User not logged in</div>
}

  return (
    <Stack className="flex flex-col w-full h-screen border-2 border-green-500">
      <Stack>
        {user && <h1>{user.name}s Dashboard</h1>}
        <SignOutButton />
      </Stack>

      <Stack flexDirection="row">
        <NavStack />
        <Stack justifyContent="space-between">
          {children}
          ${money}
          {/* <PlanetModal /> */}
          <Canvas />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout
