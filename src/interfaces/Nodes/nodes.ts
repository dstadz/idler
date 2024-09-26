export interface UseHomeNodeProps {
  ctx: CanvasRenderingContext2D // Type for the canvas context
  homeNodeData: NodeTypeData // Ensure this type has the correct structure
}

export interface UseResourceNodeProps {
  ctx: CanvasRenderingContext2D // Type for the canvas context
  homeNode: NodeType // Ensure this type has the correct structure
  resourceNodesData: NodeTypeData[] // Ensure this type has the correct structure
}

export interface UseTransportNodeProps {
  ctx: CanvasRenderingContext2D // Type for the canvas context
  homeNode: NodeType // Ensure this type has the correct structure
  resourceNodes: ResourceNodeType[]
  transportNodesData: TransportNodeType[] // Ensure this type has the correct structure
}
