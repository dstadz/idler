
type NodeType = {
  position: [number, number]
  resources: Record<string, number>
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
