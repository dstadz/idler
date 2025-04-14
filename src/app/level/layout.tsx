import React from 'react'
import { Stack, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { GameControls } from '@/components/game/GameControls'
import { GameStateProvider } from '@/contexts/GameStateContext'

export default function LevelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GameStateProvider>
      <Stack sx={styles.container}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Level
            </Typography>
            <Button
              color="inherit"
              component={Link}
              href="/overworld"
            >
              Exit
            </Button>
          </Toolbar>
        </AppBar>
        <Stack sx={styles.content}>
          <GameControls />
          {children}
        </Stack>
      </Stack>
    </GameStateProvider>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    bgcolor: 'background.default',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
}
