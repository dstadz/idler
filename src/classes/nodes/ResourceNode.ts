import { TransportNode, Node } from "../nodes"

export class ResourceNode extends Node {
  transportNode?: TransportNode

  constructor({ ctx, position, homeNode, emoji, size, transportNode, resources, id, setHomeResources }: {
    id: string
    ctx: CanvasRenderingContext2D
    homeNode: { position: [number, number] }
    position: [number, number]
    emoji: string
    size: number
    resources?: {
      stone?: number
      wood?: number
      food?: number
    }
    setHomeResources: () => void
    transportNode?: { emoji: string; size: number; speed: number; strength: number }
  }) {
    super({ ctx, position, size, emoji, resources, id })

    if (transportNode) {
      this.transportNode = new TransportNode({
        id,
        ctx,
        homeNode,
        parentNode: this,
        position: this.position,
        emoji: transportNode.emoji,
        size: transportNode.size,
        speed: transportNode.speed,
        strength: transportNode.strength,
        dexterity: transportNode.dexterity,
        setHomeResources: setHomeResources,
      })
    }
  }

  drawUnit() { super.drawUnit() }
}
