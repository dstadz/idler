import { CanvasNode } from './CanvasNode'
import { ResourceNodeType } from "@/types/node"

export class ResourceNode extends CanvasNode {
  homeNode: CanvasNode

  constructor({
    id,
    ctx,
    position,
    homeNode,
    emoji,
    size,
    resources,
  }: ResourceNodeType) {
    super({
      id,
      ctx,
      position,
      size,
      emoji,
      resources,
    })
    this.homeNode = homeNode
  }
}
