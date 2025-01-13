// components/DashboardLayout.tsx
'use client'

import React, { ReactNode, useEffect } from 'react'
import { useAtom } from 'jotai'
import { Stack } from '@mui/material'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import { moneyAtom, userAtom, userIdAtom } from '@/atoms'
import { supabase } from '@/lib/supabase'
import Button from '@/components/UI/Button'

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
    <Stack style={{ width: '100%', height: '100%' }} flexDirection='row'>
      <NavStack />
      <Stack flexDirection="column" sx={{ border: '5px solid green' }}>
        <Header money={money} user={user} />
        {children}
        <Canvas />
      </Stack>
    </Stack>
  )
}

export default DashboardLayout

const Header = ({ money, user }: { money: number; user: any}) => (
  <Stack flexDirection="row" sx={{ border: '3px solid blue' }}>
    {user && <h1>{user.name}s Dashboard</h1>}
  ${money}
    <SignOutButton />
  </Stack>
)
