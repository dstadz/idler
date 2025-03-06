'use client'
import React, { useCallback, useEffect, useState } from "react"
import { useUnitDivs } from './useUnitDivs';
import PropTypes from 'prop-types';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';
import { useHomeNode } from "@/hooks/nodes/useHomeNode";
import { hexHeight, hexWidth } from "@/utils/constants";

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
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (!buildingNodes || !homeNode) return

    // Initialize units with their initial positions
    const initialUnits = unitData.map((node) => ({
      id: node.id,
      position: node.position,
      size: node.size,
      emoji: node.emoji,
      speed: node.levels.speed,
      homeNode: { ...homeNode , position: [600, 600] },
      target: [300, 300],
      inventory: []
    }));
    setUnits(initialUnits);

    return () => {
      setUnits([]);
    }
  }, [buildingNodes, homeNode]);


  const updateTarget = (unit, target) => {
    const updatedUnit = { ...unit, target: convertHexPositionToPixel(target) }
    return updatedUnit
  }

  const updatePosition = unit => {
    const { target, position, speed } = unit
    if (!target || !position) return unit
    const dx = target[0] - position[0];
    const dy = target[1] - position[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const hasArrived = distance <= speed;
    let updatedUnit = { ...unit }
    if (hasArrived) updatedUnit = handleArrival(unit)

    const newPosition = hasArrived ? target : [
      position[0] + (dx / distance) * speed,
      position[1] + (dy / distance) * speed,
    ];
    updatedUnit = { ...updatedUnit, position: newPosition };
    return updatedUnit
  }

  const handleArrival = useCallback((unit) => {
    if (!buildingNodes) return
    const newTarget =  buildingNodes[Math.floor(Math.random() * buildingNodes.length)]

    return updateTarget(unit, newTarget.position)
  }, [buildingNodes])


  const updateUnitsPositions = useCallback(() => {
    if (!units?.length) return []
    const updatedUnits = units.map(updatePosition)
    setUnits(updatedUnits)
  }, [units, handleArrival])

    return {
      units,
      updateUnitsPositions,
    };
  }

export const Unit = ({ unit }) => {
  const { position, size, emoji } = unit
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
      {emoji}
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
