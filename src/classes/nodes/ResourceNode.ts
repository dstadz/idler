import { TransportNode, Node } from "../nodes"

export class ResourceNode extends Node {
  constructor({ ctx, position, homeNode, emoji, size, transportNode, resources, id, uuid, setHomeResources }: {
    id: string
    uuid: string
    ctx: CanvasRenderingContext2D
    homeNode: Node
    position: [number, number]
    emoji: string
    size: number
    resources?: {
      stone?: number
      wood?: number
      food?: number
    }
  }) {
    super({ ctx, position, size, emoji, resources, id, uuid})

  }

  drawUnit() { super.drawUnit() }
}
