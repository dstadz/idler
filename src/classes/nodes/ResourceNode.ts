import { ResourceRecord } from "@/types/node"
import { TransportNode, Node } from "../nodes"

export class ResourceNode extends Node {
  constructor({ ctx, position, homeNode, emoji, size, resources, id, uuid } : {
    id: string
    uuid: string
    ctx: CanvasRenderingContext2D
    homeNode: Node
    position: [number, number]
    emoji: string
    size: number
    resources: ResourceRecord
  }) {
    super({ ctx, position, size, emoji, resources, id, uuid })

  }

  drawUnit() { super.drawUnit() }
}
