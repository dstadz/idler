'use client'
import React, { useCallback, useEffect, useRef } from 'react'
import { Unit } from './Unit'
import { Box, Stack } from '@mui/material'
import { useUnits } from '@/hooks/nodes/useUnits'
import { RESOURCES } from '@/utils/contants/game'
import PropTypes from 'prop-types'
import { useHomeNode } from '@/hooks/nodes/useHomeNode'
import { useGameState } from '@/contexts/GameStateContext'
import { Units } from './Units'
import { UnitsList } from './UnitsList'

export const Gamefield = () => {
  const { units, allies, enemies } = useGameState()

  if (!units || units.length === 0) return null

  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <Units units={units} />
      </Box>
      <Box sx={{ width: 400, p: 2 }}>
        <UnitsList units={units} allies={allies} enemies={enemies} />
      </Box>
    </Stack>
  )
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
