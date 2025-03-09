import React from 'react'
import { useResources } from '@/hooks/nodes/useResources'
import { styles } from '@/utils/styles'
import { Stack, Typography } from '@mui/material'

const TopRow = () => {
  const { resourceList, resources } = useResources()
  return (
    <Stack className='top-row' sx={styles.row}>
    <Stack className='resources' sx={styles.resources}>
      {resourceList.map(resource => (
        <Stack key={resource} sx={styles.resource}>
          <Typography>{resource}: {resources[resource]}</Typography>
        </Stack>
      ))}
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
