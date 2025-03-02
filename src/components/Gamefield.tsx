'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';
// import { useUnitDivs } from './useUnitDivs';

const UnitDiv = ({
  unit
}) => {
  const {
    position,
    size,
    emoji,
  } = unit
  console.log(`🚀 ~ unit:`, unit)
  const styles = {
    unit:  {
      border: '3px solid red',
      position: 'absolute',
      top: position[1],
      height: size,
      left: position[0],
      width: size,
      zIndex: 1,
      pointerEvents: 'none'
    },
  }
  return (
    <div style={styles.unit}>{emoji}</div>
  )
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
]

const useUnitDivs = ({ buildingNodes }) => {
    const commonProps = {
      buildingNodes,
    }

    const [units, setUnits] = useState([]);

    useEffect(() => {
      console.log(`🚀 ~ useEffect ~ unitData:`, unitData)
      setUnits(unitData)
    }, [unitData])

  return {
    units,
  }
}


const Gamefield = () => {
  const { buildingNodes } = useBuildingNodes();
  const { units } = useUnitDivs({ buildingNodes });

  const [targetPoint, setTargetPoint] = useState([0, 0]);

  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setTargetPoint([y, x]);
  };

  const moveUnits = () => {
    units.forEach((unit) => {
      const unitDiv = document.getElementById(`unit-${unit.id}`);
      if (unitDiv) {
        unitDiv.style.top = `${targetPoint[0]}px`;
        unitDiv.style.left = `${targetPoint[1]}px`;
      }
    });
  };

  useEffect(() => {
    moveUnits();
  }, [targetPoint]);

  return (
    <div
      style={{
        border: '3px solid green',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
      onMouseMove={handleMouseMove}
    >
      {units.map((unit) => (
        <div
          key={unit.id}
          id={`unit-${unit.id}`}
          style={{
            border: '3px solid red',
            position: 'absolute',
            top: unit.position[1],
            left: unit.position[0],
            height: unit.size,
            width: unit.size,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {unit.emoji}
        </div>
      ))}
    </div>
  );
};

export default Gamefield;
