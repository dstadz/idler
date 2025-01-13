import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Stack } from '@mui/material'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const data = await supabase.from('users').select('*')

  return (
    <Stack sx={{ border: '3px solid purple' }}>
      <h1>Dashboard Page</h1>
    </Stack>
  )
}
