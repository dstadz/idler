import React, { createContext, useState, useContext, useEffect, useReducer, useCallback } from 'react'
import { useInterval } from '@/hooks/useInterval'
import { GameState, GameAction, GameEvent, User } from '../types/game'
import { GAME_SETTINGS } from '../utils/constants'

interface Resource {
  amount: number
  rate: number // per second
}

interface Building {
  id: string
  level: number
  cost: number
  production: number
}

interface GameStateContextType {
  gameState: GameState
  dispatch: React.Dispatch<GameAction>
  events: GameEvent[]
  user: User | null
  isLoading: boolean
  error: string | null
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined)

interface GameStateProviderProps {
  children: React.ReactNode
}

const initialState: GameState = {
  resources: {
    gold: { amount: 0, rate: 0 },
    wood: { amount: 0, rate: 0 },
    stone: { amount: 0, rate: 0 },
  },
  buildings: [],
  lastUpdate: Date.now(),
  isPaused: false,
  gameSpeed: 1,
  playerId: ''
}

type GameAction =
  | { type: 'UPDATE_RESOURCES' }
  | { type: 'ADD_BUILDING'; payload: Building }
  | { type: 'UPGRADE_BUILDING'; payload: { id: string } }
  | { type: 'LOAD_STATE'; payload: GameState }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'SET_GAME_SPEED'; payload: number }

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'UPDATE_RESOURCES': {
      if (state.isPaused) return state

      const now = Date.now()
      const timePassed = ((now - state.lastUpdate) / 1000) * state.gameSpeed // Convert to seconds and apply game speed

      return {
        ...state,
        resources: {
          gold: {
            ...state.resources.gold,
            amount: state.resources.gold.amount + (state.resources.gold.rate * timePassed),
          },
          wood: {
            ...state.resources.wood,
            amount: state.resources.wood.amount + (state.resources.wood.rate * timePassed),
          },
          stone: {
            ...state.resources.stone,
            amount: state.resources.stone.amount + (state.resources.stone.rate * timePassed),
          },
        },
        lastUpdate: now,
      }
    }
    case 'ADD_BUILDING': {
      return {
        ...state,
        buildings: [...state.buildings, action.payload],
        resources: {
          ...state.resources,
          gold: {
            ...state.resources.gold,
            amount: state.resources.gold.amount - action.payload.cost,
          },
        },
      }
    }
    case 'UPGRADE_BUILDING': {
      return {
        ...state,
        buildings: state.buildings.map(building =>
          building.id === action.payload.id
            ? {
                ...building,
                level: building.level + 1,
                production: building.production * 1.5,
              }
            : building
        ),
      }
    }
    case 'LOAD_STATE': {
      return action.payload
    }
    case 'PAUSE_GAME': {
      return {
        ...state,
        isPaused: true,
      }
    }
    case 'RESUME_GAME': {
      return {
        ...state,
        isPaused: false,
        lastUpdate: Date.now(), // Reset the last update time when resuming
      }
    }
    case 'SET_GAME_SPEED': {
      return {
        ...state,
        gameSpeed: action.payload,
      }
    }
    case 'BUILD':
      // Implementation for building
      return state
    case 'UPGRADE':
      // Implementation for upgrading
      return state
    case 'DEMOLISH':
      // Implementation for demolishing
      return state
    case 'HARVEST':
      // Implementation for harvesting
      return state
    case 'END_TURN':
      return {
        ...state,
        turn: state.turn + 1,
        lastUpdate: Date.now()
      }
    case 'SELECT_CELL':
      // Implementation for cell selection
      return state
    default:
      return state
  }
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState)
  const [events, setEvents] = useState<GameEvent[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const value = {
    gameState,
    dispatch,
    events,
    user,
    isLoading,
    error
  }

  // Auto-save every 30 seconds
  useEffect(() => {
    const saveGame = () => {
      localStorage.setItem('gameState', JSON.stringify(gameState))
    }

    const interval = setInterval(saveGame, 30000)
    return () => clearInterval(interval)
  }, [gameState])

  // Load saved state on mount
  useEffect(() => {
    const savedState = localStorage.getItem('gameState')
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) })
    }
  }, [])

  // Update resources every second, but only if not paused
  useInterval(() => {
    if (!gameState.isPaused) {
      dispatch({ type: 'UPDATE_RESOURCES' })
    }
  }, 1000)

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameState = (): GameStateContextType => {
  const context = useContext(GameStateContext)
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context
}
