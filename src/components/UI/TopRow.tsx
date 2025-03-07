
import { styles } from '@/utils/styles'
import { Stack, Typography } from '@mui/material'
import React from 'react'

const TopRow = () => {
  return (
    <Stack className='top-row' sx={styles.row}>
    <Stack className='resources' sx={styles.resources}>
    <Typography>stuff: 10</Typography>
    <Typography>things: 15</Typography>
    </Stack>
    <Stack className='settings' sx={styles.statBlock}>
      <Stack sx={styles.dataButton}>
        <Typography>stats</Typography>
      </Stack>
      <Stack sx={styles.dataButton}>
        <Typography>settings</Typography>
      </Stack>
    </Stack>
  </Stack>  )
}

export default TopRow
