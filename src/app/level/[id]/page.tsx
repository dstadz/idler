'use client'

import React from 'react'
import { Stack, Typography, Paper } from '@mui/material'
import { useGameState } from '@/contexts/GameStateContext'
import GameGrid from '@/components/game/GameGrid'

interface LevelPageProps {
  params: Promise<{
    id: string
  }>
}

export default function LevelPage({ params }: LevelPageProps) {
  const resolvedParams = React.use(params)
  const { id } = resolvedParams
  const { state } = useGameState()

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.gameArea}>
        <GameGrid />
      </Stack>
    </Stack>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    p: 3,
  },
  resources: {
    mb: 3,
  },
  resourceCard: {
    p: 2,
    minWidth: 150,
    textAlign: 'center',
  },
  gameArea: {
    flex: 1,
    bgcolor: 'background.paper',
    borderRadius: 2,
    p: 3,
    position: 'relative',
    overflow: 'hidden',
  },
}
