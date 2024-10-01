import { CanvasNode } from "@/classes"
import { RESOURCES } from "@/utils/constants"

// STONE | WOOD | FOOD | GOLD | POWER | ENERGY | WATER
export type ResourceKey = keyof typeof RESOURCES
export type ResourceRecord = Record<ResourceKey, number>

export type NodeTypeRawData = {
  id: string
  uuid?: string
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
  uuid: string
}

export type ResourceNodeType = NodeType & {
  homeNode: CanvasNode
}
export type TransportNodeTypeData = Omit<NodeTypeData, 'position', 'resources'> & {
  parentId: string
  speed: number
  strength: number
  dexterity: number
}

export type TransportNodeType = Omit<TransportNodeTypeData, 'parentId'> & {
  parentNode?: ResourceNode
  homeNode: NodeType
  targetNode: NodeType
  position: [number, number]
  resources: ResourceRecord
  isLoading: boolean
}
