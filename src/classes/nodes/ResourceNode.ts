import { ResourceNodeType, ResourceRecord } from "@/types/node"
import { TransportNode, Node } from "../nodes"

export class ResourceNode extends Node {
  constructor({
    id,
    uuid,
    ctx,
    position,
    homeNode,
    emoji,
    size,
    resources,
  } : ResourceNodeType) {
    super({
      id,
      uuid,
      ctx,
      position,
      size,
      emoji,
      resources,
      drawUnit: () => this.drawUnit()
    })
  }

  drawUnit() { super.drawUnit() }
}
