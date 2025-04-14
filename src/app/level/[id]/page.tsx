'use client'

import React from 'react'
import { Stack, Typography, Paper } from '@mui/material'
import { useGameState } from '@/contexts/GameStateContext'

interface LevelPageProps {
  params: Promise<{
    id: string
  }>
}

export default function LevelPage({ params }: LevelPageProps) {
  const resolvedParams = React.use(params)
  const { id } = resolvedParams
  const { state } = useGameState()
  console.log(`🚀 ~ LevelPage ~ state:`, state)

  return (
    <Stack sx={styles.container}>
      <Stack direction="row" spacing={2} sx={styles.resources}>
        <Paper sx={styles.resourceCard}>
          <Typography variant="h6">Gold</Typography>
          <Typography variant="h4">
            {/* {Math.floor(state.resources.gold.amount)} */}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {/* {state.resources.gold.rate.toFixed(1)}/s */}
          </Typography>
        </Paper>
        <Paper sx={styles.resourceCard}>
          <Typography variant="h6">Wood</Typography>
          <Typography variant="h4">
             {/* {Math.floor(state.resources.wood.amount)} */}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {/* {state.resources.wood.rate.toFixed(1)}/s */}
          </Typography>
        </Paper>
        <Paper sx={styles.resourceCard}>
          <Typography variant="h6">Stone</Typography>
          <Typography variant="h4">
            {/* {Math.floor(state.resources.stone.amount)} */}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {/* {state.resources.stone.rate.toFixed(1)}/s */}
          </Typography>
        </Paper>
      </Stack>

      <Stack sx={styles.gameArea}>
        {/* Game content will go here */}
        <Typography variant="h4">Level {id}</Typography>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}
