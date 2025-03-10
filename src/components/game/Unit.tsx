'use client'

import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Stack, Typography } from '@mui/material'
import { convertHexPositionToPixel, getDistanceFromTarget } from "@/utils/gameHelpers"
import { useHomeNode } from '@/hooks/nodes/useHomeNode'
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes'


export const useUnit = ({ unit: oldUnit }) => {
  const [unit, setUnit] = useState(oldUnit)
  const { homeNode } = useHomeNode()

  // const handleUnitArrival = () => {
  //   console.log(`🚀 ~ handleUnitArrival:`)
  //   if (!unit.target) return unit

  //   unit.waitingTime = 10 - unit.levels.dexterity

  //   if (unit.target === homeNode) {
  //     unit.inventory = []
  //     unit.target = getRandomBuilding()
  //   } else {
  //     unit.target = homeNode
  //     unit.inventory = [{ name: 'wood', quantity: 1 }] // Always picks up 1 wood
  //   }
  //   return unit
  // }

  const updateUnitPosition = (unit) => {
    if (unit.waitingTime) return { ...unit, waitingTime: unit.waitingTime - 1 }
    if (!unit.target) return { ...unit, target: homeNode }


    const { speed, dexterity } = unit.levels
    const { distance, newPosition } = getDistanceFromTarget(unit)

    if (distance <= speed) {
      setTimeout(() => setUnits((prevUnits) =>
        prevUnits.map((u) => u.id === unit.id ? handleUnitArrival(unit) : u)
      ), 3000 / dexterity)

      return { ...unit }
    }


    return { ...unit, position: newPosition }
  }


  const updateUnit = () => {
    if (!unit.id || !homeNode.map_id) return
    console.log(`🚀 ~ updateUnit ~ unit`, unit)
    setUnit(prev => {
      const updatedUnit = { ...prev }
      if (!prev.target) updatedUnit.target = homeNode
      if (prev.waitingTime > 0) updatedUnit.waitingTime = prev.waitingTime - 1
      const { position, target, levels: { speed } } = updatedUnit
      const [targetX, targetY] = target.position
      const [currentX, currentY] = position
      const dx = targetX - currentX
      const dy = targetY - currentY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const newPosition = [
        currentX + (dx / distance) * speed,
        currentY + (dy / distance) * speed,
      ]
      if (distance <= speed) {
        updatedUnit.xxx = handleUnitArrival()
      } else {
        updatedUnit.position = newPosition
      }
      console.log(`🚀uU`, updatedUnit)






      return updatedUnit
    })
  }

  return {
    ...unit,
    updateUnit,
  }
}

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
