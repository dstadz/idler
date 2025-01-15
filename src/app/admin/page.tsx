import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Stack, Typography } from '@mui/material'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const data = await supabase.from('users').select('*')

  return (
    <Stack sx={{ border: '3px solid purple' }}>
      <Typography sx={{ fontSize: '2rem' }}>Admin Page</Typography>
    </Stack>
  )
}
