import React, { createContext, useContext, useState } from 'react'
import { GameState } from '../types/GameState'

interface GameStateContextType {
  gameState: GameState
  setGameState: (state: GameState) => void
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined)

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    grid: [],
    resources: {
      gold: 1000,
      wood: 500,
      stone: 500,
      food: 1000
    },
    turn: 1
  })

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameState = () => {
  const context = useContext(GameStateContext)
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context
}
