import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { UNIT_TYPES } from '@/types/unit';
import CollapsibleManager from './CollapsibleManager';
import { useUnit } from '@/hooks/useUnit';

export default function UnitManager() {
  const { units, selectUnit } = useUnit();
  console.log(`🚀 ~ UnitManager ~ units:`, units)

  return (
    <CollapsibleManager title="Units">
      <Box sx={styles.unitsList}>
        {units.map((unit) => (
          <Paper
            key={unit.id}
            elevation={2}
            sx={{
              ...styles.unitCard,
              border: unit.isSelected ? '2px solid #2196F3' : 'none',
            }}
            onClick={() => selectUnit(unit.id)}
          >
            <Typography variant="h6">
              {UNIT_TYPES[unit.type].emoji} {unit.name} (Lvl {unit.level})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {UNIT_TYPES[unit.type].description}
            </Typography>
            <Typography variant="body2">Health: {unit.stats.health}</Typography>
            <Typography variant="body2">Attack: {unit.stats.attack}</Typography>
            <Typography variant="body2">Defense: {unit.stats.defense}</Typography>
            <Typography variant="body2">Speed: {unit.stats.speed}</Typography>
            <Typography variant="body2">Range: {unit.stats.range}</Typography>
            <Typography variant="body2">Experience: {unit.experience}</Typography>
          </Paper>
        ))}
      </Box>
    </CollapsibleManager>
  );
}

const styles = {
  unitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  unitCard: {
    padding: 1.5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
};
