import { ResourceNodeType, ResourceRecord } from "@/types/node"
import { TransportNode, Node } from "../nodes"

export class ResourceNode extends Node {
  homeNode: Node

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
      // drawUnit: () => this.drawUnit()
    })
    this.homeNode = homeNode
  }

  drawUnit() { super.drawUnit() }
}
