import { hexToScreen } from './hexUtils'
import { Unit } from '@/types/unit'
import { Building } from '@/types/building'

// Constants
export const GRID_SIZE = 12 // 5x5 grid
export const CELL_WIDTH = 64
export const CELL_HEIGHT = CELL_WIDTH * Math.sqrt(3) / 2 // height = width * sin(60°)
export const HOME_NODE = [6, 6] as const
export const MOVEMENT_SPEED = 10 // pixels per update
export const ARRIVAL_THRESHOLD = 15 // pixels
export const UPDATE_INTERVAL = 100 // ms

// Vector operations
export const distance = (p1: [number, number], p2: [number, number]) => {
  return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
}

export const addPoints = (p1: [number, number], p2: [number, number]): [number, number] => {
  return [p1[0] + p2[0], p1[1] + p2[1]]
}

export const scalePoint = (p: [number, number], scale: number): [number, number] => {
  return [p[0] * scale, p[1] * scale]
}

export const normalize = (p: [number, number]): [number, number] => {
  const length = distance([0, 0], p)
  return [p[0] / length, p[1] / length]
}

// Position helpers
export const getHomeCenter = (): [number, number] => {
  const homeScreen = hexToScreen(HOME_NODE[0], HOME_NODE[1])
  return [
    homeScreen.x + CELL_WIDTH / 2,
    homeScreen.y + CELL_HEIGHT / 2
  ]
}

export const getBuildingCenter = (building: Building): [number, number] => {
  const buildingScreen = hexToScreen(building.position[0], building.position[1])
  return [
    buildingScreen.x + CELL_WIDTH / 2,
    buildingScreen.y + CELL_HEIGHT / 2
  ]
}

// Unit movement helpers
export const getUnitTarget = (
  unit: Unit,
  buildings: Building[],
  homeCenter: [number, number]
): [number, number] | null => {
  // If unit has an explicit target, use it
  if (unit.targetPosition) {
    return unit.targetPosition as [number, number]
  }

  const distanceToHome = distance(unit.position, homeCenter)
  const isAtHome = distanceToHome < ARRIVAL_THRESHOLD

  // If at home, pick a random building
  if (isAtHome) {
    const randomBuilding = buildings[Math.floor(Math.random() * buildings.length)]
    return randomBuilding ? getBuildingCenter(randomBuilding) : null
  }

  // Check if at any building
  const atBuilding = buildings.find(building => {
    const buildingCenter = getBuildingCenter(building)
    return distance(unit.position, buildingCenter) < ARRIVAL_THRESHOLD
  })

  // If at a building, move back to home
  if (atBuilding) {
    return homeCenter
  }

  // If not at home or building, continue to current target
  return unit.isAtHome ? getBuildingCenter(buildings[0]) : homeCenter
}

export const shouldUpdatePosition = (
  current: [number, number],
  target: [number, number],
  direction: [number, number]
): boolean => {
  // Always update if we're not at the target
  return current[0] !== target[0] || current[1] !== target[1]
}

export const updateUnitPosition = (
  unit: Unit,
  target: [number, number],
  homeCenter: [number, number]
): { position: [number, number], isAtHome: boolean, targetPosition: [number, number] | null } => {
  const direction: [number, number] = [
    target[0] - unit.position[0],
    target[1] - unit.position[1]
  ]
  const distanceToTarget = distance([0, 0], direction)

  // If close enough to target, snap to it
  if (distanceToTarget < ARRIVAL_THRESHOLD) {
    const isAtHome = distance(target, homeCenter) < ARRIVAL_THRESHOLD
    return {
      position: target,
      isAtHome,
      targetPosition: null
    }
  }

  // Otherwise, move towards target
  const normalizedDirection = normalize(direction)
  const movement = scalePoint(normalizedDirection, MOVEMENT_SPEED)
  const newPosition = addPoints(unit.position, movement)
  const isAtHome = distance(newPosition, homeCenter) < ARRIVAL_THRESHOLD

  return {
    position: newPosition,
    isAtHome,
    targetPosition: target
  }
}

// Map generation
export const generateBlankMap = () => {
  const grid = Array(GRID_SIZE).fill(null).map((_, row) =>
    Array(GRID_SIZE).fill(null).map((_, col) => ({
      id: `cell-${row}-${col}`,
      terrain: 'grass',
      isSelected: false
    }))
  )

  return {
    grid,
    resources: {
      gold: 0,
      wood: 0,
      stone: 0,
      food: 0
    },
    turn: 1,
    lastUpdate: Date.now(),
    playerId: ''
  }
}

// Cell color mapping
export const getCellColor = (terrain: string) => {
  switch (terrain) {
    case 'grass':
      return '#4CAF50'
    case 'water':
      return '#2196F3'
    case 'mountain':
      return '#795548'
    case 'forest':
      return '#2E7D32'
    default:
      return '#9E9E9E'
  }
}
