import React from 'react'
import { Stack, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Link from 'next/link'

export default function OverworldLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Stack sx={styles.container}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Idler
          </Typography>
          <Button
            color="inherit"
            component={Link}
            href="/dashboard"
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Stack sx={styles.content}>
        {children}
      </Stack>
    </Stack>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
}
