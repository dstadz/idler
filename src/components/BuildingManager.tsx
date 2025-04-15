import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { Building, BUILDING_TYPES } from '@/types/building';

interface BuildingManagerProps {
  buildings: Building[];
  onBuildingSelect: (buildingId: string) => void;
}

export default function BuildingManager({ buildings, onBuildingSelect }: BuildingManagerProps) {
  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        Buildings
      </Typography>
      <Box sx={styles.buildingsList}>
        {buildings.map((building) => (
          <Paper
            key={building.id}
            elevation={2}
            sx={{
              ...styles.buildingCard,
              border: building.isSelected ? '2px solid #2196F3' : 'none',
            }}
            onClick={() => onBuildingSelect(building.id)}
          >
            <Typography variant="h6">
              {BUILDING_TYPES[building.type].emoji} {building.name} (Lvl {building.level})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {BUILDING_TYPES[building.type].description}
            </Typography>
            <Typography variant="body2">Health: {building.stats.health}</Typography>
            <Typography variant="body2">Production: {building.stats.production}/turn</Typography>
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
    </Box>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
    padding: 2,
    zIndex: 1000,
  },
  title: {
    mb: 2,
    textAlign: 'center',
  },
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
