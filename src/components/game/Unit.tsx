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
    waitingTime,

    // updateUnit
  } = unit
  console.log(`🚀 ~ Unit ~ unit:`, unit)


  // useEffect(() => {
  //   requestAnimationFrame(updateUnit)
  //   // return () => cancelAnimationFrame(updateUnit)
  // }, [updateUnit])

  // useEffect(() => {
  //   console.log(`🚀 ~ Unit ~ position`, position)
  // }, [position])
  return (
    <Stack
      sx={{
        border: '1px solid red',

        position: 'absolute',
        top: `${position[1]}px`,
        left: `${position[0]}px`,
        lineHeight: `${size}px`,
        fontSize: `${size}px`,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Stack>
        {inventory.length > 0 && inventory.map(resource => (
          <Typography key={resource.name}>{resource.name}: {resource.quantity}</Typography>
        ))}
      </Stack>
      <Stack flexDirection={'row'}>
        <Typography>{emoji}</Typography>
        <Box sx={{ background: 'green', width: `${waitingTime * 10 }px`, height: '20px' }}/>
      </Stack>
    </Stack>
  )
}

Unit.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired,
    inventory: PropTypes.arrayOf(PropTypes.object).isRequired,
    waitingTime: PropTypes.number,
  }).isRequired,
}

export const UnitPlus = ({ unit }) => {
  const newUnit = useUnit({ unit })
  return <Unit unit={newUnit} />
}
