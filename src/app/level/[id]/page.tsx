'use client'

import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { GameState } from '@/types/game';
import { Unit, UNIT_TYPES } from '@/types/unit';
import { Building, BUILDING_TYPES } from '@/types/building';
import { hexToScreen, screenToHex, distanceBetweenHexes } from '@/utils/hexUtils';
import { useUnit } from '@/hooks/useUnit';
import { useBuilding } from '@/hooks/useBuilding';

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

const HOME_NODE = { x: 6, y: 6 };
const MOVEMENT_SPEED = 10; // pixels per update
const ARRIVAL_THRESHOLD = 15; // pixels
const UPDATE_INTERVAL = 100; // ms

const generateDummyUnits = (): Unit[] => {
  const homeScreen = hexToScreen(HOME_NODE.x, HOME_NODE.y);

  // Generate random offsets around home
  const getRandomOffset = () => (Math.random() - 0.5) * 50; // ±25 pixels

  return [
    {
      id: '1',
      name: 'Worker 1',
      type: 'worker',
      stats: UNIT_TYPES.worker.baseStats,
      position: {
        x: homeScreen.x + getRandomOffset(),
        y: homeScreen.y + getRandomOffset(),
      },
      level: 1,
      experience: 0,
      isSelected: false,
    },
    {
      id: '2',
      name: 'Soldier 1',
      type: 'soldier',
      stats: UNIT_TYPES.soldier.baseStats,
      position: {
        x: homeScreen.x + getRandomOffset(),
        y: homeScreen.y + getRandomOffset(),
      },
      level: 1,
      experience: 0,
      isSelected: false,
    },
    {
      id: '3',
      name: 'Scout 1',
      type: 'scout',
      stats: UNIT_TYPES.scout.baseStats,
      position: {
        x: homeScreen.x + getRandomOffset(),
        y: homeScreen.y + getRandomOffset(),
      },
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize our hooks
  const { units, updateUnit, createUnit } = useUnit();
  const { buildings, createBuilding } = useBuilding();

  // Initialize dummy data
  useEffect(() => {
    console.log('Initializing dummy data...');

    // Create dummy buildings if none exist
    if (buildings.length === 0) {
      console.log('Creating dummy buildings...');
      const dummyBuildings = [
        {
          type: 'farm',
          position: { x: 2, y: 2 },
        },
        {
          type: 'mine',
          position: { x: 3, y: 5 },
        },
      ];

      dummyBuildings.forEach(building => {
        createBuilding(building.type as keyof typeof BUILDING_TYPES, building.position);
      });
    }

    // Create dummy units if none exist
    if (units.length === 0) {
      console.log('Creating dummy units...');
      const homeScreen = hexToScreen(HOME_NODE.x, HOME_NODE.y);
      const getRandomOffset = () => (Math.random() - 0.5) * 50;

      const dummyUnits = [
        {
          type: 'worker',
          position: {
            x: homeScreen.x + getRandomOffset(),
            y: homeScreen.y + getRandomOffset(),
          },
        },
        {
          type: 'soldier',
          position: {
            x: homeScreen.x + getRandomOffset(),
            y: homeScreen.y + getRandomOffset(),
          },
        },
        {
          type: 'scout',
          position: {
            x: homeScreen.x + getRandomOffset(),
            y: homeScreen.y + getRandomOffset(),
          },
        },
      ];

      dummyUnits.forEach(unit => {
        createUnit(unit.type as keyof typeof UNIT_TYPES, unit.position);
      });
    }
  }, [buildings.length, units.length, createBuilding, createUnit]);

  const handleUnitSelect = (unitId: string) => {
    // Assuming setUnits is called elsewhere in the code
  };

  const handleBuildingSelect = (buildingId: string) => {
    // Assuming setBuildings is called elsewhere in the code
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

  // Movement logic
  useEffect(() => {
    const interval = setInterval(() => {
      units.forEach(unit => {
        // Get the current target position
        let target;
        if (unit.targetPosition) {
          target = unit.targetPosition;
        } else if (unit.isAtHome) {
          // At home, pick a random building
          const randomBuilding = buildings[Math.floor(Math.random() * buildings.length)];
          target = randomBuilding?.position;
        } else {
          // At a building, move back to home
          target = HOME_NODE;
        }

        if (!target) return;

        // Calculate direction to target
        const dx = target.x - unit.position.x;
        const dy = target.y - unit.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If we're close enough to the target, snap to it and switch targets
        if (distance < ARRIVAL_THRESHOLD) {
          updateUnit(unit.id, {
            position: target,
            isAtHome: !unit.isAtHome,
            targetPosition: null
          });
          return;
        }

        // Otherwise, move towards the target
        const moveX = (dx / distance) * MOVEMENT_SPEED;
        const moveY = (dy / distance) * MOVEMENT_SPEED;

        updateUnit(unit.id, {
          position: {
            x: unit.position.x + moveX,
            y: unit.position.y + moveY
          }
        });
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [units, buildings, updateUnit]);

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
                const isHomeNode = colIndex === HOME_NODE.x && rowIndex === HOME_NODE.y;

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
                    ) : isHomeNode ? (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '24px',
                        }}
                      >
                        🏠
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
          {/* Render floating units */}
          {units.map((unit) => (
            <Box
              key={unit.id}
              sx={{
                position: 'absolute',
                left: unit.position.x,
                top: unit.position.y,
                zIndex: 100,
                fontSize: '24px',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                filter: unit.isSelected ? 'drop-shadow(0 0 5px #2196F3)' : 'none',
                transition: 'left 0.05s, top 0.05s',
              }}
              onClick={() => handleUnitSelect(unit.id)}
            >
              {UNIT_TYPES[unit.type].emoji}
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
  managersContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    zIndex: 1000,
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
