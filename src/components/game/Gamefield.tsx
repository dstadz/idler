'use client'
import React, { useEffect } from 'react'
import { Unit } from './Unit'
import { Box } from '@mui/material'
import { useUnits } from '@/hooks/nodes/useUnits'
import { RESOURCES } from '@/utils/contants/game'
import PropTypes from 'prop-types'
import { useHomeNode } from '@/hooks/nodes/useHomeNode'

const Gamefield = () => {
  const { units, updateUnitsPositions } = useUnits()
  const { homeNode } = useHomeNode()


  useEffect(() => {
    requestAnimationFrame(updateUnitsPositions)

    return () => cancelAnimationFrame(updateUnitsPositions)
  }, [updateUnitsPositions])

  if (!homeNode.map_id) return null

  return (
    <Box className='gamefield' sx={styles.gamefield} >
      {units.map((unit) => <Unit key={unit.id} unit={unit} />)}

      <ul>
        {units.map((unit) => <li key={unit.id}>
          {unit.emoji}
          [{Math.floor(unit.position[0])}, {Math.floor(unit.position[1])}]
          {/* waiting: {unit.waitingTime} */}
        </li>)}
      </ul>
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
    padding: 2,
    pointerEvents: 'none',
  },
}

const Resource = ({ resource }) => {
  const { position, size } = resource
  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${position[1]}px`,
        left: `${position[0]}px`,
        lineHeight: `${size}px`,
        fontSize: `${size}px`,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {RESOURCES[resource.type].EMOJI}
    </Box>
  )
}
Resource.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
}
