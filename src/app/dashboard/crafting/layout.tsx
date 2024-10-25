'use client'
import React from 'react'
import { Stack, Typography } from '@mui/material'

import { LayoutProps } from '@/interfaces'
import SubNav from '@/components/SubNav'

const CraftingsLayout = ({ children }: LayoutProps) => {
  console.log('crafting layout')
  return (
  <div className='flex flex-col border-2 w-full border-4 border-purple-500'>
    Crafting Layout
    {children}
    <Stack>

    <Typography>
      </Typography>
    </Stack>
  </div>
)}

export default CraftingsLayout
