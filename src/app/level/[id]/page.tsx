'use client'

import React, { useEffect, useState } from 'react'
import { Stack, Typography, Box } from '@mui/material'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { GameState } from '@/types/game'
import { UNIT_TYPES } from '@/types/unit'
import { BUILDING_TYPES } from '@/types/building'
import { useUnit } from '@/hooks/useUnit'
import { useBuilding } from '@/hooks/useBuilding'
import {
  CELL_WIDTH,
  CELL_HEIGHT,
  HOME_NODE,
  MOVEMENT_SPEED,
  ARRIVAL_THRESHOLD,
  UPDATE_INTERVAL,
  distance,
  addPoints,
  scalePoint,
  normalize,
  getHomeCenter,
  getBuildingCenter,
  getUnitTarget,
  shouldUpdatePosition,
  generateBlankMap,
  getCellColor
} from '@/utils/gameHelpers'

export default function LevelPage() {
  const params = useParams()
  const levelId = params.id as string
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize our hooks
  const { units, updateUnit, createUnit } = useUnit()
  const { buildings, createBuilding } = useBuilding()

  // Initialize dummy data
  useEffect(() => {
    console.log('Initializing dummy data...')

    // Create dummy buildings if none exist
    if (buildings.length === 0) {
      console.log('Creating dummy buildings...')
      const dummyBuildings = [
        {
          type: 'farm',
          position: [2, 2],
        },
        {
          type: 'mine',
          position: [3, 5],
        },
      ]

      dummyBuildings.forEach(building => {
        createBuilding(building.type as keyof typeof BUILDING_TYPES, building.position)
      })
    }

    // Create dummy units if none exist
    if (units.length === 0) {
      console.log('Creating dummy units...')
      const homeCenter = getHomeCenter()
      const getRandomOffset = () => (Math.random() - 0.5) * 50

      const dummyUnits = [
        {
          type: 'worker',
          position: [
            homeCenter[0] + getRandomOffset(),
            homeCenter[1] + getRandomOffset(),
          ],
        },
        {
          type: 'soldier',
          position: [
            homeCenter[0] + getRandomOffset(),
            homeCenter[1] + getRandomOffset(),
          ],
        },
        {
          type: 'scout',
          position: [
            homeCenter[0] + getRandomOffset(),
            homeCenter[1] + getRandomOffset(),
          ],
        },
      ]

      dummyUnits.forEach(unit => {
        createUnit(unit.type as keyof typeof UNIT_TYPES, unit.position)
      })
    }
  }, [buildings.length, units.length, createBuilding, createUnit])

  const handleUnitSelect = (unitId: string) => {
    // Assuming setUnits is called elsewhere in the code
  }

  const handleBuildingSelect = (buildingId: string) => {
    // Assuming setBuildings is called elsewhere in the code
  }

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          setError('Not authenticated')
          setGameState(generateBlankMap())
          return
        }

        const { data: levelData, error: levelError } = await supabase
          .from('game_states')
          .select('*')
          .eq('level_id', levelId)
          .eq('player_id', session.user.id)
          .single()

        if (levelError) {
          setError('Error fetching level data')
          setGameState(generateBlankMap())
          return
        }

        setGameState(levelData as GameState)
      } catch (error) {
        console.error('Error fetching level data:', error)
        setError('An unexpected error occurred')
        setGameState(generateBlankMap())
      } finally {
        setLoading(false)
      }
    }

    fetchLevelData()
  }, [levelId])

  // Movement logic
  useEffect(() => {
    const interval = setInterval(() => {
      const homeCenter = getHomeCenter()

      units.forEach(unit => {
        const target = getUnitTarget(unit, buildings, homeCenter)
        if (!target) return

        const direction: [number, number] = [
          target[0] - unit.position[0],
          target[1] - unit.position[1]
        ]
        const distanceToTarget = distance([0, 0], direction)

        if (distanceToTarget < ARRIVAL_THRESHOLD) {
          const isAtHome = distance(unit.position, homeCenter) < ARRIVAL_THRESHOLD

          if (shouldUpdatePosition(unit.position, target, direction)) {
            updateUnit(unit.id, {
              position: target,
              isAtHome,
              targetPosition: null
            })
          }
          return
        }

        const normalizedDirection = normalize(direction)
        const movement = scalePoint(normalizedDirection, MOVEMENT_SPEED)

        if (shouldUpdatePosition(unit.position, target, direction)) {
          updateUnit(unit.id, {
            position: addPoints(unit.position, movement)
          })
        }
      })
    }, UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [units, buildings, updateUnit])

  const getBuildingAtPosition = (x: number, y: number) => {
    return buildings.find(b => b.position[0] === x && b.position[1] === y)
  }

  const getUnitAtPosition = (x: number, y: number) => {
    return units.find(u => u.position[0] === x && u.position[1] === y)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography>Loading level data...</Typography>
      </Box>
    )
  }

  if (!gameState) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography>No level data found</Typography>
      </Box>
    )
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
                const building = getBuildingAtPosition(colIndex, rowIndex)
                const isHomeNode = colIndex === HOME_NODE[0] && rowIndex === HOME_NODE[1]

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
                )
              })}
            </Box>
          ))}
          {/* Render floating units */}
          {units.map((unit) => (
            <Box
              key={unit.id}
              sx={{
                position: 'absolute',
                left: unit.position[0],
                top: unit.position[1],
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
  )
}

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
}
