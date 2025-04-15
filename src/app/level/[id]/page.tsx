'use client'

import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import { useParams } from 'next/navigation'

export default function LevelPage() {
  const params = useParams()
  const levelId = params.id as string

  return (
    <Stack spacing={3} sx={{ height: '100vh', p: 3 }}>
      <Typography variant="h4">Level {levelId}</Typography>
      <Box sx={styles.container}>
      </Box>
    </Stack>
  )
}

const styles = {
  container: {
    flex: 1,
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: 1,
    overflow: 'hidden',
  },
}
