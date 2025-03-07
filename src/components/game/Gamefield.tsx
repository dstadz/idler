'use client'
import React, { useEffect } from 'react'
import { Unit } from './Unit'
import { Box } from '@mui/material'
import { useUnitDivs } from './useUnitDivs'
import { styles } from '@/utils/styles'

const Gamefield = () => {
  const { units, updateUnitsPositions } = useUnitDivs()
  useEffect(() => {
    requestAnimationFrame(updateUnitsPositions)
  }, [updateUnitsPositions])

  return (
    <Box className='gamefield' sx={styles.gamefield} >
      {units.map((unit) => <Unit key={unit.id} unit={unit} />)}
    </Box>
  )
}

export default Gamefield
