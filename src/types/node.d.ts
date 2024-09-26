export type ResourceRecord = Record<string, number>

export type NodeTypeData = {
  id: string
  position: [number, number]
  emoji: string
  size: number
  resources: ResourceRecord
}
export type NodeType = NodeTypeData &{
  uuid: string
  ctx: CanvasRenderingContext2D
  drawUnit: () => void
}

export type TransportNodeType = NodeType & {
  parentNode: ResourceNodeType
  parentId: string
  homeNode: NodeType
  targetNode: NodeType
  position: [number, number]
  isLoading: boolean
  speed: number
  strength: number
  dexterity: number
  drawUnit: () => void
  handleArrival: (arrivalNode?: NodeType) => void
  startLoading: (targetNode: NodeType, resource: string) => void
  startUnloading: (targetNode: NodeType) => void
  deliverResources: (targetNode: NodeType) => void
  updatePosition: () => void
}


export type ResourceNodeType = NodeType & {
  homeNode: NodeType
  drawUnit: () => void
}
