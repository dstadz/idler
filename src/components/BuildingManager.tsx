import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { BUILDING_TYPES } from '@/types/building';
import CollapsibleManager from './CollapsibleManager';
import { useBuilding } from '@/hooks/useBuilding';

export default function BuildingManager() {
  const { buildings, selectBuilding } = useBuilding();

  return (
    <CollapsibleManager title="Buildings">
      <Box sx={styles.buildingsList}>
        {buildings.map((building) => (
          <Paper
            key={building.id}
            elevation={2}
            sx={{
              ...styles.buildingCard,
              border: building.isSelected ? '2px solid #2196F3' : 'none',
            }}
            onClick={() => selectBuilding(building.id)}
          >
            <Typography variant="h6">
              {BUILDING_TYPES[building.type].emoji} {building.name} (Lvl {building.level})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {BUILDING_TYPES[building.type].description}
            </Typography>
            <Typography variant="body2">Health: {building.stats.health}</Typography>
            <Typography variant="body2">Production: {building.stats.production}/turn</Typography>
            <Typography variant="body2">Storage: {building.stats.storage}</Typography>
            <Typography variant="body2">Defense: {building.stats.defense}</Typography>
            {building.constructionProgress !== undefined && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Construction Progress:</Typography>
                <LinearProgress
                  variant="determinate"
                  value={building.constructionProgress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    </CollapsibleManager>
  );
}

const styles = {
  buildingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  buildingCard: {
    padding: 1.5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
};
