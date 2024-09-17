
type NodeType = {
  position: [number, number]
  emoji: string
  size: number
}

type TransportNodeType = {
  speed: number
  emoji: string
  size: number
}

type ResourceNodeType = NodeType & {
  transportNode?: TransportNodeType
}

// Canvas
