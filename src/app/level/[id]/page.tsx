'use client'

import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { GameState } from '@/types/game';

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
      <Box sx={styles.gridContainer}>
        {gameState.grid.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              ...styles.gridRow,
              marginLeft: rowIndex % 2 === 1 ? `${CELL_WIDTH / 2}px` : 0,
            }}
          >
            {row.map((cell) => (
              <Box
                key={cell.id}
                sx={{
                  ...styles.gridCell,
                  backgroundColor: getCellColor(cell.terrain),
                }}
              >
                {cell.building && (
                  <Typography variant="body2">
                    {cell.building.type} (Lvl {cell.building.level})
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        ))}
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
  gridContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridRow: {
    display: 'flex',
    marginTop: `-${CELL_HEIGHT * 0.25}px`,
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
