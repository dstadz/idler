import React from 'react'
import { Stack, Typography, Button } from '@mui/material'
import Link from 'next/link'

interface LevelPageProps {
  params: {
    levelId: string
  }
}

export default function LevelPage({ params }: LevelPageProps) {
  const { levelId } = params

  return (
    <Stack sx={styles.container}>
      <Stack sx={styles.header}>
        <Typography variant="h4">Level {levelId}</Typography>
        <Button
          component={Link}
          href="/overworld"
          variant="outlined"
        >
          Back to Map
        </Button>
      </Stack>

      <Stack sx={styles.content}>
        <Stack sx={styles.infoCard}>
          <Typography variant="h6" sx={styles.cardTitle}>
            Level Information
          </Typography>
          <Stack spacing={2}>
            <Typography>
              <strong>Difficulty:</strong> {getDifficulty(parseInt(levelId))}
            </Typography>
            <Typography>
              <strong>Rewards:</strong> {getRewards(parseInt(levelId))}
            </Typography>
            <Typography>
              <strong>Description:</strong> {getDescription(parseInt(levelId))}
            </Typography>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          size="large"
          sx={styles.playButton}
          component={Link}
          href={`/level/${levelId}`}
        >
          Play Level
        </Button>
      </Stack>
    </Stack>
  )
}

// Helper functions for level data
function getDifficulty(level: number): string {
  const difficulties = ['Easy', 'Medium', 'Hard', 'Very Hard', 'Expert']
  return difficulties[Math.min(level - 1, difficulties.length - 1)]
}

function getRewards(level: number): string {
  const baseReward = level * 100
  return `${baseReward} coins, ${level} experience points`
}

function getDescription(level: number): string {
  return `This is level ${level}. Complete the challenges to earn rewards and progress to the next level.`
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    p: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  infoCard: {
    p: 4,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 1,
    minWidth: 300,
    maxWidth: 600,
  },
  cardTitle: {
    mb: 2,
    pb: 1,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  playButton: {
    px: 4,
    py: 2,
    fontSize: '1.2rem',
  },
}
