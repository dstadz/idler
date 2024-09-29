import { CanvasNode } from './CanvasNode'
import { ResourceNodeType } from "@/types/node"

export class ResourceNode extends CanvasNode {
  homeNode: CanvasNode

  constructor({
    id,
    uuid,
    ctx,
    position,
    homeNode,
    emoji,
    size,
    resources,
  }: ResourceNodeType) {
    super({
      id,
      uuid,
      ctx,
      position,
      size,
      emoji,
      resources,
    })
    this.homeNode = homeNode
  }
}
