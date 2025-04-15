'use client'

import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { GameState } from '@/types/game';
import UnitManager from '@/components/UnitManager';
import BuildingManager from '@/components/BuildingManager';
import { Unit, UNIT_TYPES } from '@/types/unit';
import { Building, BUILDING_TYPES } from '@/types/building';

const GRID_SIZE = 12; // 5x5 grid
const CELL_WIDTH = 64;
const CELL_HEIGHT = CELL_WIDTH * Math.sqrt(3) / 2; // height = width * sin(60°)

interface Cell {
  id: string;
  terrain: string;
  isSelected: boolean;
  building?: {
    type: string;
    level: number;
  };
}

const generateDummyUnits = (): Unit[] => {
  return [
    {
      id: '1',
      name: 'Worker 1',
      type: 'worker',
      stats: UNIT_TYPES.worker.baseStats,
      position: { x: 2, y: 2 },
      level: 1,
      experience: 0,
      isSelected: false,
    },
    {
      id: '2',
      name: 'Soldier 1',
      type: 'soldier',
      stats: UNIT_TYPES.soldier.baseStats,
      position: { x: 3, y: 3 },
      level: 1,
      experience: 0,
      isSelected: false,
    },
    {
      id: '3',
      name: 'Scout 1',
      type: 'scout',
      stats: UNIT_TYPES.scout.baseStats,
      position: { x: 6, y: 4 },
      level: 1,
      experience: 0,
      isSelected: false,
    },
  ];
};

const generateBlankMap = (): GameState => {
  const grid: Cell[][] = Array(GRID_SIZE).fill(null).map((_, row) =>
    Array(GRID_SIZE).fill(null).map((_, col) => ({
      id: `cell-${row}-${col}`,
      terrain: 'grass',
      isSelected: false
    }))
  );

  return {
    grid: grid as any, // Type assertion since our Cell type doesn't match HexCell exactly
    resources: {
      gold: 0,
      wood: 0,
      stone: 0,
      food: 0
    },
    turn: 1,
    lastUpdate: Date.now(),
    playerId: ''
  };
};

export default function LevelPage() {
  const params = useParams();
  const levelId = params.id as string;
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [units, setUnits] = useState<Unit[]>(generateDummyUnits());
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: '1',
      name: 'Farm 1',
      type: 'farm',
      stats: { health: 200, production: 10, storage: 100, defense: 5 },
      position: { x: 2, y: 2 },
      level: 1,
      isSelected: false,
    },
    {
      id: '2',
      name: 'Mine 1',
      type: 'mine',
      stats: { health: 250, production: 15, storage: 150, defense: 8 },
      position: { x: 3, y: 5 },
      level: 1,
      isSelected: false,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleUnitSelect = (unitId: string) => {
    setUnits(units.map(unit => ({
      ...unit,
      isSelected: unit.id === unitId
    })));
  };

  const handleBuildingSelect = (buildingId: string) => {
    setBuildings(buildings.map(building => ({
      ...building,
      isSelected: building.id === buildingId
    })));
  };

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setError('Not authenticated');
          setGameState(generateBlankMap());
          return;
        }

        const { data: levelData, error: levelError } = await supabase
          .from('game_states')
          .select('*')
          .eq('level_id', levelId)
          .eq('player_id', session.user.id)
          .single();

        if (levelError) {
          setError('Error fetching level data');
          setGameState(generateBlankMap());
          return;
        }

        setGameState(levelData as GameState);
      } catch (error) {
        console.error('Error fetching level data:', error);
        setError('An unexpected error occurred');
        setGameState(generateBlankMap());
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [levelId]);

  const getBuildingAtPosition = (x: number, y: number) => {
    return buildings.find(b => b.position.x === x && b.position.y === y);
  };

  const getUnitAtPosition = (x: number, y: number) => {
    return units.find(u => u.position.x === x && u.position.y === y);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography>Loading level data...</Typography>
      </Box>
    );
  }

  if (!gameState) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography>No level data found</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Level {levelId}</Typography>
      {error && (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {error} - Using default map
        </Typography>
      )}
      <Box sx={styles.container}>
        <UnitManager
          units={units}
          onUnitSelect={handleUnitSelect}
        />
        <BuildingManager
          buildings={buildings}
          onBuildingSelect={handleBuildingSelect}
        />
        <Box sx={styles.gridContainer}>
          {gameState.grid.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                ...styles.gridRow,
                marginLeft: rowIndex % 2 === 1 ? `${CELL_WIDTH / 2}px` : 0,
                marginTop: `-${CELL_HEIGHT * 0.25}px`,
              }}
            >
              {row.map((cell, colIndex) => {
                const building = getBuildingAtPosition(colIndex, rowIndex);
                const unit = getUnitAtPosition(colIndex, rowIndex);

                return (
                  <Box
                    key={cell.id}
                    sx={{
                      ...styles.gridCell,
                      backgroundColor: getCellColor(cell.terrain),
                      position: 'relative',
                    }}
                  >
                    {building ? (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '24px',
                          cursor: 'pointer',
                          filter: building.isSelected ? 'drop-shadow(0 0 5px #2196F3)' : 'none',
                        }}
                        onClick={() => handleBuildingSelect(building.id)}
                      >
                        {BUILDING_TYPES[building.type].emoji}
                      </Box>
                    ) : unit ? (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '24px',
                          cursor: 'pointer',
                          filter: unit.isSelected ? 'drop-shadow(0 0 5px #2196F3)' : 'none',
                        }}
                        onClick={() => handleUnitSelect(unit.id)}
                      >
                        {UNIT_TYPES[unit.type].emoji}
                      </Box>
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: 'rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        {colIndex},{rowIndex}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

const getCellColor = (terrain: string) => {
  switch (terrain) {
    case 'grass':
      return '#4CAF50';
    case 'water':
      return '#2196F3';
    case 'mountain':
      return '#795548';
    case 'forest':
      return '#2E7D32';
    default:
      return '#9E9E9E';
  }
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: '1px solid #f00',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    border: '1px solid #0f0',

  },
  gridRow: {
    display: 'flex',
  },
  gridCell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  },
};
