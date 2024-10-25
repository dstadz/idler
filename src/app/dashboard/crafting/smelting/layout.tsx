'use client'
import React from 'react'
import { Stack, Typography } from '@mui/material'

import { LayoutProps } from '@/interfaces'

const SmeltingLayout = ({ children }: LayoutProps) => {
  console.log('Smeltinging layout')
  return (
  <div className='flex flex-col border-2 w-full border-4 border-purple-500'>
    Smelting Layout
    {children}
    <Stack>

    <Typography>
      </Typography>
    </Stack>
  </div>
)}

export default SmeltingLayout
