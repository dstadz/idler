import React from 'react'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default function OverworldPage() {
  return (
    <Stack sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Overworld Map
      </Typography>
      <Stack sx={styles.mapContainer}>
        {/* Map will be rendered here */}
        <Stack sx={styles.levelGrid}>
          {[1, 2, 3, 4, 5].map((level) => (
            <Link
              key={level}
              href={`/level/${level}`}
              style={styles.levelLink}
            >
              <Stack sx={styles.levelTile}>
                <Typography variant="h6">Level {level}</Typography>
              </Stack>
            </Link>
          ))}
        </Stack>
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
  title: {
    mb: 3,
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    bgcolor: 'background.paper',
    borderRadius: 2,
    p: 3,
    boxShadow: 1,
  },
  levelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 3,
  },
  levelLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  levelTile: {
    p: 3,
    borderRadius: 2,
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      bgcolor: 'primary.dark',
      transform: 'scale(1.05)',
      transition: 'all 0.2s ease',
    },
  },
}
