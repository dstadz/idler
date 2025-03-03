'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';
import { Box } from '@mui/material';

import PropTypes from 'prop-types';
import { hexHeight } from '@/utils/constants';
import { Unit, useUnitDivs } from '../canvas/Unit';


const Gamefield = () => {
  const { units, updatePosition } = useUnitDivs();

    useEffect(() => {
      updatePosition(units?.[0]?.id, () => console.log('hi'))
    }, [units])
  // useEffect(() => {
  //   const intervalId = setInterval(() => units.forEach(updatePosition), 16); // 16ms = 60fps
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
