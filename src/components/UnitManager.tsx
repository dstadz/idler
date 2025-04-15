import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Unit, UNIT_TYPES } from '@/types/unit';

interface UnitManagerProps {
  units: Unit[];
  onUnitSelect: (unitId: string) => void;
}

export default function UnitManager({ units, onUnitSelect }: UnitManagerProps) {
  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        Units
      </Typography>
      <Box sx={styles.unitsList}>
        {units.map((unit) => (
          <Paper
            key={unit.id}
            elevation={2}
            sx={{
              ...styles.unitCard,
              border: unit.isSelected ? '2px solid #2196F3' : 'none',
            }}
            onClick={() => onUnitSelect(unit.id)}
          >
            <Typography variant="h6">
              {UNIT_TYPES[unit.type].emoji} {unit.name}
            </Typography>
            <Typography variant="body2">Level: {unit.level}</Typography>
            <Typography variant="body2">Health: {unit.stats.health}</Typography>
            <Typography variant="body2">Position: ({unit.position.x}, {unit.position.y})</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
    padding: 2,
    zIndex: 1000,
  },
  title: {
    mb: 2,
    textAlign: 'center',
  },
  unitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  unitCard: {
    padding: 1,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
};
