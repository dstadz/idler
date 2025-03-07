'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Typography } from '@mui/material'

export const Unit = ({ unit }) => {
  const { position, size, emoji, inventory } = unit
  return (
    <div
      style={{
        position: 'absolute',
        top: `${position[1]}px`,
        left: `${position[0]}px`,
        lineHeight: `${size}px`,
        fontSize: `${size}px`,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Box>
        <Typography>{emoji}</Typography>
      </Box>
      <Stack>
        {inventory.length > 0 && inventory.map(resource => (
          <Typography key={resource.name}>{resource.name}: {resource.quantity}</Typography>
        ))}
      </Stack>
    </div>
  )
}

Unit.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired,
    inventory: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
}
