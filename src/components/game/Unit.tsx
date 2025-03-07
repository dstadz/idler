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
  // {
  //   id: 'unit1',
  //   size: 32,
  //   emoji: "🦁",
  //   position: [100, 100],
  //   levels: { speed: 1, cargo: 1, dexterity: 1 },
  // },
  // {
  //   id: 'unit2',
  //   size: 32,
  //   emoji: "🐘",
  //   position: [500, 100],
  //   levels: { speed: 1, cargo: 3, dexterity: 1 },
  // },
  {
    id: 'unit3',
    size: 32,
    emoji: "🐉",
    position: [200, 400],
    levels: { speed: 1, cargo: 1, dexterity: 1 },
  },
  // {
  //   id: 'unit4',
  //   size: 32,
  //   emoji: "🪼",
  //   position: [100, 500],
  //   levels: { speed: 1, cargo: 3, dexterity: 1 },
  // },
]

export const useUnitDivs = () => {
  const { homeNode } = useHomeNode()
  const { buildingNodes } = useBuildingNodes()
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (!buildingNodes || !homeNode) return

    // Initialize units with their initial positions
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



  const handleUnitArrival = useCallback((unit) => {
    if (!buildingNodes) return
    const { target } = unit
    console.log(`🚀 ~ handleUnitArrival ~ unit:`, unit)

    if (target.position === homeNode.position) startUnloading(unit)
    else startLoading(unit)

  }, [buildingNodes])

  const updateUnitPosition = unit => {
    // console.log(`🚀 ~ updateUnitPosition ~ unit:`, unit)
    const { target, position, levels: { speed } } = unit
    if (!target || !position) return {
      ...unit,
      target: homeNode,
    }
    const [targetX, targetY] = target.position
    const dx = targetX - position[0];
    const dy = targetY - position[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hasArrived = distance <= speed;
    let updatedUnit = { ...unit }
    if (hasArrived) updatedUnit = handleUnitArrival(unit)

    const newPosition = hasArrived ? target : [
      position[0] + (dx / distance) * speed,
      position[1] + (dy / distance) * speed,
    ];
    // console.log(`🚀 ~ updateUnitPosition ~ updatedUnit:`, updatedUnit)
    updatedUnit = { ...updatedUnit, position: newPosition };
    return updatedUnit
  }

  const updateUnitsPositions = useCallback(() => {
    if (!units?.length) return []
    const updatedUnits = units.map(updateUnitPosition)
    setUnits(updatedUnits)
  }, [units])

  return {
    units,
    updateUnitsPositions,
  };
}

export const Unit = ({ unit }) => {
  const { position, size, emoji, isLoading, target, inventory } = unit
  return (
    <div
      style={{
        // border: '3px solid red',
        position: 'absolute',
        // ...getCoordFromTile(position),
        top: `${position[1]}px`,
        left: `${position[0]}px`,
        lineHeight: `${size}px`,
        fontSize: `${size}px`,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Box>
        <Typography>{isLoading ? '🔄' : emoji}</Typography>
      </Box>
      <Stack>
        {inventory.length > 0 && inventory.map(resource => (
          <Typography key={resource.name}>{resource.name}: {resource.quantity}</Typography>
        ))}
      </Stack>
    </div>
  );
}

Unit.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: PropTypes.number.isRequired,
    emoji: PropTypes.string.isRequired,
  }).isRequired,
};
