export class CanvasElement {
  ctx: CanvasRenderingContext2D
  position: [number, number]
  emoji: string
  size: number
  id: string

  constructor({ ctx, position, emoji, size, id }: {
    ctx: CanvasRenderingContext2D
    position: [number, number]
    emoji: string
    size: number
    id: string
  }) {
    this.ctx = ctx
    this.position = position
    this.emoji = emoji
    this.size = size
    this.id = id
  }

  drawUnit() {
    this.ctx.font = `${this.size}px serif`
    this.ctx.fillText(this.emoji, this.position[0], this.position[1])
    // this.ctx.fillText(`[${Math.round(this.position[0])}, ${Math.round(this.position[1])}]`, this.position[0], this.position[1] + 40)
  }
}

export class ResourceNode extends CanvasElement {
  transportNode?: TransportNode

  constructor({ ctx, position, homeNode, emoji, size, transportNode, id }: {
    ctx: CanvasRenderingContext2D
    position: [number, number]
    homeNode: { position: [number, number] }
    emoji: string
    size: number
    transportNode?: { emoji: string; size: number; speed: number }
    id: string
  }) {
    super({ ctx, position, size, emoji, id })

    if (transportNode) {
      this.transportNode = new TransportNode({
        ctx,
        emoji: transportNode.emoji,
        size: transportNode.size,
        speed: transportNode.speed,
        id,
        parentNode: this,
        homeNode,
      })
    }
  }

  drawUnit() {
    super.drawUnit()
  }
}

export class TransportNode extends CanvasElement {
  parentNode: ResourceNode
  homeNode: { position: [number, number] }
  target: [number, number]
  speed: number

  constructor({ ctx, emoji, size, id, parentNode, homeNode, speed }: {
    ctx: CanvasRenderingContext2D
    emoji: string
    size: number
    id: string
    parentNode: ResourceNode
    homeNode: { position: [number, number] }
    speed: number
  }) {
    super({ ctx, position: homeNode.position, emoji, size, id})
    this.parentNode = parentNode
    this.homeNode = homeNode
    this.target = parentNode.position
    this.speed = speed
  }

  drawUnit() {
    this.ctx.save()
    const dx = this.target[0] - this.position[0]
    const isMovingRight = dx > 0
    // Optional: mirror emoji if moving right
    // if (isMovingRight) this.ctx.scale(-1, 1)
    this.ctx.font = `${this.size}px serif`
    super.drawUnit()
    this.ctx.restore()
  }

  updatePosition() {
    if (this.target.length !== 2) return
    const dx = this.target[0] - this.position[0]
    const dy = this.target[1] - this.position[1]
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= this.speed) {
      if (
        this.target[0] === this.homeNode.position[0] &&
        this.target[1] === this.homeNode.position[1]
      ) {
        this.target = [this.parentNode.position[0], this.parentNode.position[1]]
      } else {
        this.target = [this.homeNode.position[0], this.homeNode.position[1]]
      }
    } else {
      this.position = [
        this.position[0] + (dx / distance) * this.speed,
        this.position[1] + (dy / distance) * this.speed
      ]
    }
  }

  // hasArrived(): boolean {
  //   return this.position[0] === this.target[0] && this.position[1] === this.target[1]
  // }
}
