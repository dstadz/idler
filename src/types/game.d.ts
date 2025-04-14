export type Unit = {
  id: string
  position: number[]
  size: number
  emoji: string
  levels: {
    speed: number
    dexterity: number
  }
  inventory: {
    name: string
    quantity: number
  }[]
}

// Building Types
export type BuildingType = 'HOME' | 'FARM' | 'MINE' | 'LUMBER_MILL' | 'MARKET' | 'HOUSE' | 'BARRACKS'

export interface Building {
  type: BuildingType
  level: number
  status: 'active' | 'inactive' | 'underConstruction'
  constructionProgress?: number
  lastHarvested?: number
}

// Resource Types
export interface Resources {
  gold: number
  wood: number
  stone: number
  food: number
}

// Hex Grid Types
export interface HexCoordinates {
  q: number
  r: number
  s: number
}

export interface HexCell {
  id: string
  coordinates: HexCoordinates
  building?: Building
  terrain: 'grass' | 'water' | 'mountain' | 'forest'
  isSelected: boolean
}

// Game State Types
export interface GameState {
  grid: HexCell[][]
  resources: Resources
  turn: number
  lastUpdate: number
  playerId: string
}

// Building Configuration Types
export interface BuildingConfig {
  name: string
  description: string
  emoji: string
  production: number
  maintenance: number
  constructionTime: number
  constructionCost: Resources
  upgradeCost: Resources
  maxLevel: number
}

// Action Types
export type GameAction =
  | { type: 'BUILD'; buildingType: BuildingType; cellId: string }
  | { type: 'UPGRADE'; cellId: string }
  | { type: 'DEMOLISH'; cellId: string }
  | { type: 'HARVEST'; cellId: string }
  | { type: 'END_TURN' }
  | { type: 'SELECT_CELL'; cellId: string }

// Event Types
export interface GameEvent {
  type: 'constructionComplete' | 'harvest' | 'upgradeComplete' | 'demolitionComplete'
  cellId: string
  timestamp: number
  details?: Record<string, unknown>
}

// UI Types
export interface ModalType {
  type: 'Admin' | 'Player'
  isOpen: boolean
  cellId?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// User Types
export interface User {
  id: string
  email: string
  username: string
  gameState?: GameState
  lastActive: number
}

// Authentication Types
export interface AuthState {
  isAuthenticated: boolean
  user?: User
  loading: boolean
  error?: string
}

// Game Settings Types
export interface GameSettings {
  gridSize: number
  startingResources: Resources
  turnDuration: number
  constructionSpeed: number
  harvestInterval: number
}

// Node Types
export type NodeType = 'RAW' | 'REFINED' | 'INGREDIENT' | 'FINAL'

export interface Node {
  id: string
  name: string
  type: NodeType
  emoji: string
  baseValue: number
  processingTime: number
  requiredResources?: {
    resource: string
    quantity: number
  }[]
  produces?: {
    resource: string
    quantity: number
  }[]
  unlocksAt?: number // turn number when this becomes available
}

export interface NodePath {
  raw: Node
  refined?: Node
  ingredient?: Node
  final?: Node
}

export interface HexTile {
  id: string
  position: [number, number]
  type: 'empty' | 'land' | 'water' | 'mountain' | 'forest'
}

export interface Unit {
  id: string
  emoji: string
  position: [number, number]
  size: number
  levels: {
    speed: number
    cargo: number
    mining: number
    combat: number
  }
  inventory: Array<{
    name: string
    quantity: number
  }>
  type: 'ally' | 'enemy'
}
