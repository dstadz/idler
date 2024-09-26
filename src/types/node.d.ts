import { RESOURCES } from "@/utils/contants"

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
  drawUnit: () => void
}

export type ResourceNodeType = NodeType & {
  // homeNode: NodeType
  // drawUnit: () => void
}

export type TransportNodeTypeData = NodeType & {
  parentId: string
  speed: number
  strength: number
  dexterity: number
}
  export type TransportNodeType = TransportNodeTypeData & {
  parentNode: ResourceNodeType
  homeNode: NodeType
  targetNode: NodeType
  position: [number, number]
  isLoading: boolean
  // drawUnit: () => void
  // handleArrival: (arrivalNode?: NodeType) => void
  // startLoading: (targetNode: NodeType, resource: string) => void
  // startUnloading: (targetNode: NodeType) => void
  // deliverResources: (targetNode: NodeType) => void
  // updatePosition: () => void
}
