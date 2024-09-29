import { Node } from "@/classes"
import { RESOURCES } from "@/utils/constants"

// STONE | WOOD | FOOD | GOLD | POWER | ENERGY | WATER
export type ResourceKey = keyof typeof RESOURCES
export type ResourceRecord = Record<ResourceKey, number>
export type NodeTypeData = {
  id: string
  position: [number, number]
  emoji: string
  size: number
  resources: ResourceRecord
}

export type NodeType = NodeTypeData & {
  ctx: CanvasRenderingContext2D
  uuid: string
  // drawUnit: () => void
}

export type ResourceNodeType = NodeType & {
  homeNode: Node
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
  // other dynamic methods or properties...
}
