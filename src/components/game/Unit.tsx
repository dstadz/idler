'use client'

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Typography } from '@mui/material'
import { useUnit } from '@/hooks/nodes/useUnit'

export const Unit = ({ unit }) => {
  const {
    position,
    size,
    emoji,
    inventory,
    color = 'red',
    loadingProgress,
    isLoading,
    isArriving,
  } = unit

  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${position[1]}px`,
        left: `${position[0]}px`,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.2s ease-out',
        opacity: isArriving ? 0.8 : 1,
        scale: isArriving ? 0.95 : 1,
      }}
    >
      {isLoading && (
        <Box
          sx={{
            width: `${size}px`,
            height: '4px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '4px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${loadingProgress}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              transition: 'width 0.016s linear',
              willChange: 'width',
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          fontSize: `${size}px`,
          lineHeight: 1,
          transition: 'all 0.2s ease-out',
          transform: isArriving ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {emoji}
      </Box>
      <Stack>
        {inventory.length > 0 && inventory.map(resource => (
          <Typography key={resource.name}>{resource.name}: {resource.quantity}</Typography>
        ))}
      </Stack>
    </Box>
  )
}

Unit.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired,
    inventory: PropTypes.arrayOf(PropTypes.object).isRequired,
    color: PropTypes.string,
    loadingProgress: PropTypes.number,
    isLoading: PropTypes.bool,
    isArriving: PropTypes.bool,
  }).isRequired,
}

export const UnitPlus = ({ unit }) => {
  const newUnit = useUnit({ unit })
  return <Unit unit={{ ...newUnit, color: 'green' }} />
}

UnitPlus.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired,
    inventory: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
}
