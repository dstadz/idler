import { ResourceNode } from "@/classes"
import { CanvasNode } from "@/classes/nodes/CanvasNode"
import { NodeTypeRawData, TransportNodeType } from "@/types/node"

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
