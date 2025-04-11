import { HexCell } from './HexCell'

export interface GameState {
  grid: HexCell[][]
  resources: {
    gold: number
    wood: number
    stone: number
    food: number
  }
  turn: number
}
