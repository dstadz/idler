'use client'
import React, { useCallback, useEffect, useState } from "react"
import { useUnitDivs } from './useUnitDivs';
import PropTypes from 'prop-types';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';
import { useHomeNode } from "@/hooks/nodes/useHomeNode";
import { hexHeight, hexWidth } from "@/utils/constants";
import { Box, Stack, Typography } from "@mui/material";

export const convertHexPositionToPixel = (position) => {
  const [x, y] = position
  const isShifted = x % 2 === 1

  const [newY, newX] = [
    ((isShifted ? 3 : 1) / 4 * hexWidth) + (y * hexWidth),
    (hexHeight * .25) + (x * hexHeight * .75),
    // (hexHeight / 2) + (x * hexHeight),
  ]
  return [newY, newX]
}

const unitData = [
  {
    id: 'unit1',
    size: 32,
    emoji: "🦁",
    position: [100, 100],
    levels: { speed: 1, cargo: 1, dexterity: 1 },
  },
  {
    id: 'unit2',
    size: 32,
    emoji: "🐘",
    position: [500, 100],
    levels: { speed: 1, cargo: 3, dexterity: 1 },
  },
  {
    id: 'unit3',
    size: 32,
    emoji: "🐉",
    position: [200, 400],
    levels: { speed: 1, cargo: 1, dexterity: 1 },
  },
  {
    id: 'unit4',
    size: 32,
    emoji: "🪼",
    position: [100, 500],
    levels: { speed: 1, cargo: 3, dexterity: 1 },
  },
]

export const useUnitDivs = () => {
  const { homeNode } = useHomeNode()
  const { buildingNodes } = useBuildingNodes()
  const [units, setUnits] = useState([])

  useEffect(() => {
    if (!buildingNodes || !homeNode) return
  const initialUnits = unitData.map((node) => ({
    id: node.id,
    position: node.position,
    size: node.size,
    emoji: node.emoji,
    levels: node.levels,
    inventory: [{ name: 'wood', quantity: 3 }],
  }));
  setUnits(initialUnits);

  return () => {
    setUnits([]);
  }
}, [buildingNodes, homeNode]);

const getPriorityTargetNode = unit => {
  const target = [ 400, 400]
  return { target }
}

const startLoading = unit => {
  console.log(`🚀 ~  ~ startLoading:`, unit)
  const loadingTime = 1000 / unit.levels.dexterity
  // const availableResourceList = Object.keys(unit.target.inventory)
  //   .filter(key => unit.target.inventory[key as keyof ResourceRecord] > 1)

  // if (availableResourceList.length === 0) {
  //     unit.isLoading = false
  //     return
  // }

  // const ranIdx = Math.floor(Math.random() * availableResourceList.length)
  // const resource = availableResourceList[ranIdx] as keyof ResourceRecord

  // setTimeout(() => {
      // if (!unit.inventory || !unit.target.inventory || !(resource in unit.target.inventory)) return

      // const availableAmount = unit.target.inventory[resource] || 0
      // const transferAmount = Math.min(Math.floor(availableAmount), unit.levels.cargo)

      // unit.inventory[resource] = (unit.inventory[resource] || 0) + transferAmount
      // unit.target.inventory[resource] -= transferAmount
      // unit.target = unit.homeNode
      return unit
  // }, loadingTime)
}

const startUnloading = unit => {
  console.log(`🚀 ~ startUnloading ~ unit:`, unit)
  const { levels } = unit
  const unloadingTime = 1000 / (levels.dexterity || 1)
  setTimeout(() => {
    console.log(`🚀 ~ updatedUnit:`, updatedUnit)
  const updatedUnit = {
    ...unit,
    ...deliverResources(unit),
    isLoading: false,
    target: getPriorityTargetNode(unit),
  }
  }, unloadingTime)
}

const deliverResources = unit => {
  console.log(`🚀 ~ deliverResources ~ unit:`, unit)
  const { inventory } = unit
  return {
    ...unit,
    inventory: [],
  }
}



  const getRandomBuilding = () => {
    if (!buildingNodes.length) return homeNode
    const node = buildingNodes[Math.floor(Math.random() * buildingNodes.length)]
    return { ...node, position: convertHexPositionToPixel(node.position), }
  }

  const handleUnitArrival = (unit) => {
    if (!unit.target) return unit

    if (unit.target === homeNode) {
      return {
        ...unit,
        inventory: [],
        target: getRandomBuilding(),
      }
    }

    return {
      ...unit,
      inventory: [{ name: 'wood', quantity: 1 }], // Always picks up 1 wood
      target: homeNode,
    }
  }

  const updateUnitPosition = (unit) => {
    if (!unit.target) return { ...unit, target: homeNode }

    const { position, target, levels: { speed } } = unit
    const [targetX, targetY] = target.position
    const [currentX, currentY] = position

    const dx = targetX - currentX
    const dy = targetY - currentY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= speed) {
      return handleUnitArrival(unit)
    }

    const newPosition = [
      currentX + (dx / distance) * speed,
      currentY + (dy / distance) * speed,
    ]

    return { ...unit, position: newPosition }
  }

  const updateUnitsPositions = useCallback(() => {
    if (!units.length) return
    setUnits(units.map(updateUnitPosition))
  }, [units])

  return {
    units,
    updateUnitsPositions,
  }
}

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
