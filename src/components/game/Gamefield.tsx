'use client'
import React, { useEffect } from 'react'
import { Unit } from './Unit'
import { Box } from '@mui/material'
import { useUnits } from './useUnits'

const Gamefield = () => {
  const { units, updateUnitsPositions } = useUnits()


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

const styles = {
  gamefield: {
    border: '3px solid orange',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100dvw',
    height: '100vh',
    zIndex: 1,
    pointerEvents: 'none',
  },
}
