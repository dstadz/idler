'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';
import { Box } from '@mui/material';

import { useUnitDivs } from './useUnitDivs';
import { Unit } from '@/classes';
import PropTypes from 'prop-types';
import { hexHeight } from '@/utils/constants';

// import { useUnitDivs } from './useUnitDivs';

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

const useUnitDivs = () => {
  const { buildingNodes } = useBuildingNodes()

  const [units, setUnits] = useState([]);
  // const [targetPoints, setTargetPoints] = useState({});

  useEffect(() => {
    // Initialize units with their initial positions
    const initialUnits = unitData.map((node) => ({
      id: node.id,
      position: node.position,
      size: node.size,
      emoji: node.emoji,
      speed: node.speed,
      targetPoint: null,
    }));
    setUnits(initialUnits);
  }, [buildingNodes]);

  const updatePosition = () => {
    const updatedUnits = units.map((unit) => {
      if (unit.targetPoint) {
        const dx = unit.targetPoint[0] - unit.position[0];
        const dy = unit.targetPoint[1] - unit.position[1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = unit.speed;
        const step = Math.min(speed, distance);
        const newX = unit.position[0] + (dx / distance) * step;
        const newY = unit.position[1] + (dy / distance) * step;
        return { ...unit, position: [newX, newY] };
      }
      return unit;
    });
    setUnits(updatedUnits);
  };

  // const setTargetPoint = (unitId, targetPoint) => {
  //   setTargetPoints((prevTargetPoints) => ({ ...prevTargetPoints, [unitId]: targetPoint }));
  //   const unitIndex = units.findIndex((unit) => unit.id === unitId);
  //   if (unitIndex !== -1) {
  //     const updatedUnits = [...units];
  //     updatedUnits[unitIndex].targetPoint = targetPoint;
  //     setUnits(updatedUnits);
  //   }
  // };

  return { units, updatePosition } // , setTargetPoint };
};


const Gamefield = () => {
  const { units, updatePosition, setTargetPoint } = useUnitDivs();
  console.log(`🚀 ~ Gamefield ~ units:`, units)

  // useEffect(() => {
  //   const intervalId = setInterval(updatePosition, 16); // 16ms = 60fps
  //   return () => clearInterval(intervalId);
  // }, [updatePosition]);

  return (
    <div
      className='gamefield'
      style={{
        border: '10px solid orange',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100dvw',
        height: '100vh',
        // right: 0,
        // bottom: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {units.map((unit) => <Unit key={unit.id} unit={unit} />)}
    </div>
  );
};

export default Gamefield;


const Unit = ({ unit }) => {
  console.log(`🚀 ~ Unit ~ unit:`, unit)
  const { position, size, emoji } = unit

  const getCoordFromTile = (tile) => {
    const [row, col] = tile
    const top = hexHeight / 2 + (row * hexHeight)
    const left = col * hexHeight * .75
    console.log(`🚀 ~ getCoordFromTile ~ { top, left }:`, { top, left })
    return { top, left }
  }
  return (
    <div
      style={{
        border: '3px solid red',
        position: 'absolute',
        // ...getCoordFromTile(position),
        top: `${position[1]}px`,
        left: `${position[0]}px`,
        height: `${size * 2}px`,
        width: `${size * 2}px`,
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
