import { ResourceNode } from '@/classes'
import { CanvasNode } from '@/classes/nodes/CanvasNode'
import { NodeTypeRawData, TransportNodeType } from '@/types/node'

export interface UseResourceNodeProps {
  ctx: CanvasRenderingContext2D | null
  homeNode: CanvasNode
  resourceNodesData: NodeTypeRawData[]
}

export interface UseTransportNodeProps {
  ctx: CanvasRenderingContext2D | null
  homeNode: CanvasNode
  resourceNodes: ResourceNode[]
  transportNodesData: TransportNodeType[]
}

export interface ResourceInventory {
  wood: number
  stone: number
  iron: number
  food: number
  gold: number
  power: number
  energy: number
  water: number
}

export interface ResourceInventoryData extends ResourceInventory {
  id?: string
  entityId?: string
}

export interface Entity {
  id: string
  resourceInventoryId: string
  userId: string
  createdAt: string
  updatedAt: string
  resourceInventory: ResourceInventory
}

export interface EntityData extends Entity {
  resourceInventory: ResourceInventoryData
}

export interface HomeNode {
  id: string
  entityId: string
  type: 'HomeNode'
  xPos: number
  yPos: number
  level: number
  techUnlocked: boolean
  entity: EntityData
}

export interface ApiResponse {
  homeNode: HomeNode
}
