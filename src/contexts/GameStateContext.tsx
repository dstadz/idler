import React, { createContext, useContext, useState, ReactNode, useReducer } from 'react'
import { GameState, GameAction, GameEvent, User } from '../types/game'
import { GAME_SETTINGS } from '../utils/constants'

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
  children: ReactNode
}

const initialState: GameState = {
  grid: [],
  resources: GAME_SETTINGS.startingResources,
  turn: 1,
  lastUpdate: Date.now(),
  playerId: ''
}

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
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
