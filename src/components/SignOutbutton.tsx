'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@mui/material'

export default function SignOutButton() {
  return (
    <Button variant="contained" sx={{ m: 'auto', ml: 0 }} onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
