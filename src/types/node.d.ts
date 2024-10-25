import { CanvasNode, ResourceNode } from '@/classes'
import { RESOURCES } from '@/utils/constants'

// STONE | WOOD | FOOD | GOLD | POWER | ENERGY | WATER | IRON
export type ResourceKey = keyof typeof RESOURCES
export type ResourceRecord = Record<ResourceKey, number>

export type NodeTypeRawData = {
  id: string
  position: [number, number]
  resources: ResourceRecord
  emoji: string
  size: number
}
export type NodeTypeData = NodeTypeRawData & {
  ctx: CanvasRenderingContext2D
}

export type NodeType = NodeTypeData & {
  ctx: CanvasRenderingContext2D
}

export type ResourceNodeType = NodeType & {
  homeNode: CanvasNode
}
export type TransportNodeTypeData = Omit<NodeTypeData, 'position', 'resources'> & {
  parentId: string
  speed: number
  cargo: number
  dexterity: number
}

export type TransportNodeType = NodeType & TransportNodeTypeData & {
  parentNode?: ResourceNode
  homeNode: NodeType
  targetNode?: NodeType
  resources: ResourceRecord
  isLoading: boolean
  speed: number
  cargo: number
  dexterity: number
  emoji: string
  // eslint-disable-next-line no-unused-vars
  addToMainResources: (resource: keyof ResourceRecord, amount: number) => void
}

export type PlanetType = Omit<NodeTypeData, 'position', 'resources'> & {
  homeNode: CanvasNode
  yields: ResourceRecord
  mineRate: number
  shipSpeed: number
  cargo: number
  ship: TransportNodeType
}
