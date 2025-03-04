'use client'
import React, { useEffect } from 'react';
import { Unit, useUnitDivs } from './Unit';

const Gamefield = () => {
  const { units, updateUnitsPositions } = useUnitDivs();


  useEffect(() => {
    requestAnimationFrame(updateUnitsPositions);
  }, [updateUnitsPositions]);

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
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {units.map((unit) => (
        <Unit key={unit.id} unit={unit} />
      ))}
    </div>
  );
};

export default Gamefield;
