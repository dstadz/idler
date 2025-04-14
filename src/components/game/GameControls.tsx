'use client'

import React from 'react'
import { IconButton } from '@mui/material'
import { Pause, PlayArrow, Speed } from '@mui/icons-material'
import { useGameState } from '@/contexts/GameStateContext'

export function GameControls() {
  const { state, dispatch } = useGameState()

  const handlePauseResume = () => {
    if (state?.isPaused) {
      dispatch({ type: 'RESUME_GAME' })
    } else {
      dispatch({ type: 'PAUSE_GAME' })
    }
  }

  const handleSpeedChange = () => {
    const newSpeed = state?.gameSpeed === 1 ? 2 : 1
    dispatch({ type: 'SET_GAME_SPEED', payload: newSpeed })
  }

  return (
    <div style={styles.container}>
      <IconButton
        onClick={handlePauseResume}
        size="small"
        sx={styles.button}
      >
        {state?.isPaused ? <PlayArrow fontSize="small" /> : <Pause fontSize="small" />}
      </IconButton>
      <IconButton
        onClick={handleSpeedChange}
        size="small"
        sx={styles.button}
      >
        <Speed fontSize="small" />
      </IconButton>
    </div>
  )
}

const styles = {
  container: {
    position: 'fixed',
    top: 8,
    right: 8,
    display: 'flex',
    gap: 4,
  },
  button: {
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.9)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}
