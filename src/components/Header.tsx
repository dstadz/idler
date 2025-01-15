import React, { useEffect } from 'react'
import { Stack } from "@mui/material";
import SignOutButton from "./SignOutbutton";
import { useAtom } from 'jotai';
import { moneyAtom, userAtom, userIdAtom } from '@/atoms';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const [money] = useAtom(moneyAtom)

  const [user, setUser] = useAtom(userAtom)


    //////// USER
    const [userId, setUserId] = useAtom(userIdAtom)
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


  return (
    <Stack flexDirection="row" sx={{ border: '3px solid blue' }}>
      {user && <h1>{user.name}s Dashboard</h1>}
      ${money}
      <SignOutButton />
    </Stack>
  )
}

export default Header
