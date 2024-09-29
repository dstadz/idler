import { ResourceNode } from "@/classes"
import { CanvasNode } from "@/classes/nodes/CanvasNode"
import { NodeType, NodeTypeData, NodeTypeRawData, ResourceNodeType, TransportNodeType } from "@/types/node"

export interface UseHomeNodeProps {
  ctx: CanvasRenderingContext2D
  homeNodeId: string
}

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
