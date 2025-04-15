'use client'

import React, { useEffect, useState } from 'react'
import { Stack, AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ResourceInventory } from '@/interfaces/Nodes/nodes'
import BuildingManager from '@/components/BuildingManager'
import UnitManager from '@/components/UnitManager'

export default function LevelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const params = useParams()
  const levelId = params.id as string
  console.log(`🚀 ~ levelId:`, levelId)

  return (
    <Stack sx={styles.container}>
      <Box sx={styles.ui}>
      </Box>
      <Box sx={styles.content}>
        {children}
      </Box>
    </Stack>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  ui: {
    position: 'absolute',
    top: '30%',
    zIndex: 5,
  },
  content: {
    flex: 1,
    overflow: 'auto',
    p: 3,
  },
  resourceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}
