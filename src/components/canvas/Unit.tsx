import { useUnitDivs } from './useUnitDivs';
import React, { useEffect, useState } from "react"
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
      speed: node.speed,
      buildingNodes,
      target: [1000, 1000]
    }));
    setUnits(initialUnits);
  }, [buildingNodes]);

  const updatePosition = (unit) => {
    if (!unit) return
    const updatedUnits = units.map((u) => {
      if (u.id === unit.id) {
        return { ...u, position: unit.position };
      }
      return u;
    });
    const dx = unit.target[0] - unit.position[0];
    const dy = unit.target[1] - unit.position[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = unit.speed;
    const step = Math.min(speed, distance);
    const newX = unit.position[0] + (dx / distance) * step;
    const newY = unit.position[1] + (dy / distance) * step;

    console.log(`🚀 ~ updatePosition ~ unit:`, unit)
    setUnits(updatedUnits);
    return { ...unit, position: [newX, newY] };
  }

  return { units , updatePosition };
}



export const Unit = ({ unit }) => {
  console.log(`🚀 ~ Unit ~ unit:`, unit)
  const { position, size, emoji } = unit
  const { updatePosition } = useUnitDivs();

  // const getCoordFromTile = (tile) => {
  //   const [row, col] = tile
  //   const top = hexHeight / 2 + (row * hexHeight)
  //   const left = col * hexHeight * .75
  //   console.log(`🚀 ~ getCoordFromTile ~ { top, left }:`, { top, left })
  //   return { top, left }
  // }
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
      {/* <button onClick={() => updatePosition(unit)}>Move</button> */}
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
