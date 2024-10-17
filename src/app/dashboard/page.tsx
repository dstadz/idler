'use client'

import React from 'react'
import { Box, Stack } from '@mui/material'
import Canvas from '@/components/Canvas'

const OverworldPage = () => {

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Box>
        This is Page Content
        {/* <Canvas /> */}
      </Box>
    </Stack>
  )
}

export default OverworldPage
