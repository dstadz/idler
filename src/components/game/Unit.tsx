'use client'
 import React, { useEffect, useState } from "react"
import { useUnitDivs } from './useUnitDivs';
import PropTypes from 'prop-types';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';


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
  const { buildingNodes } = useBuildingNodes()
  const [units, setUnits] = useState([]);

  useEffect(() => {
    // Initialize units with their initial positions
    const initialUnits = unitData.map((node) => ({
      id: node.id,
      position: node.position,
      size: node.size,
      emoji: node.emoji,
      speed: node.levels.speed,
      buildingNodes,
      target: [400, 400]
    }));
    setUnits(initialUnits);
  }, [buildingNodes]);

  const handleArrival = () => {
    console.log('default HA()')
  }

  const updateUnitsPositions = () => {
    const updatedUnits = [];
    for (const unit of units) {

      const dx = unit.target[0] - unit.position[0];
      const dy = unit.target[1] - unit.position[1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = unit.speed;
      if (speed > distance) {
        handleArrival()
        continue
      }

      const newX = unit.position[0] + (dx / distance) * speed;
      const newY = unit.position[1] + (dy / distance) * speed;
      const newUnit = { ...unit, position: [newX, newY] };

      updatedUnits.push(newUnit);
    }
    setUnits(updatedUnits)
  }

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
        border: '3px solid red',
        position: 'absolute',
        // ...getCoordFromTile(position),
        top: `${position[1]}px`,
        left: `${position[0]}px`,
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
