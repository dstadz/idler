export class Node {
  id: string
  ctx: CanvasRenderingContext2D
  position: [number, number]
  resources?: {
    stone?: number
    wood?: number
    food?: number
  }
  emoji: string
  size: number

  constructor({ id, ctx, position, resources = {}, emoji, size }: {
    id: string
    ctx: CanvasRenderingContext2D
    position: [number, number]
    resources?: {
      stone?: number
      wood?: number
      food?: number
    }
    emoji: string
    size: number
  }) {
    this.id = id
    this.ctx = ctx
    this.position = position
    this.resources = resources
    this.emoji = emoji
    this.size = size
}

drawUnit() {
  this.ctx.font = `${this.size}px serif`
  this.ctx.fillText(this.emoji, this.position[0], this.position[1])
  // console.log(this.emoji, this.resources)
  this.notes = [
    // `x,y: [${Math.round(this.position[0])}, ${Math.round(this.position[1])}]`,
    ...Object.keys(this.resources).map(key => `${key}: ${this.resources[key]}`),
  ].filter(Boolean)

  this.notes.map((note, i) => {
    this.ctx.fillText(note, this.position[0], this.position[1] + 20 * (i + 1))
  })
}
}

export class ResourceNode extends Node {
  transportNode?: TransportNode

  constructor({ ctx, position, homeNode, emoji, size, transportNode, resources, id }: {
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
    transportNode?: { emoji: string; size: number; speed: number; strength: number }
  }) {
    super({ ctx, position, size, emoji, resources, id })

    if (transportNode) {
      this.transportNode = new TransportNode({
        id,
        ctx,
        homeNode,
        parentNode: this,
        emoji: transportNode.emoji,
        size: transportNode.size,
        speed: transportNode.speed,
        strength: transportNode.strength,
      })
    }
  }

  drawUnit() {
    super.drawUnit()
  }
}

export class TransportNode extends Node {
  // locked
  parentNode: ResourceNode
  homeNode: { position: [number, number] }

  // dynamic
  targetNode: Node
  resources?: { stone?: number; wood?: number; food?: number } | undefined

  // stats
  speed: number
  strength: number

  constructor({ ctx, emoji, size, id, parentNode, homeNode, speed, strength, resources }: {
    ctx: CanvasRenderingContext2D
    emoji: string
    size: number
    id: string
    parentNode: ResourceNode
    homeNode: { position: [number, number] }
    speed: number
    strength: number
  }) {
    super({ ctx, position: homeNode.position, emoji, size, resources, id})
    this.parentNode = parentNode
    this.homeNode = homeNode
    this.targetNode = parentNode // Initialize targetNode as the parentNode
    this.speed = speed
    this.strength = strength
  }

  drawUnit() {
    this.ctx.save()
    const dx = this.targetNode.position[0] - this.position[0]
    const isMovingRight = dx > 0
    // Optional: mirror emoji if moving right
    // if (isMovingRight) this.ctx.scale(-1, 1)
    this.ctx.font = `${this.size}px serif`
    super.drawUnit()
    this.ctx.restore()
  }

  handleArrival() {
    console.log('arrived')
  }

  hasArrived(node = this.targetNode): boolean {
    return (
      Math.abs(this.position[0] - node.position[0]) < this.speed &&
      Math.abs(this.position[1] - node.position[1]) < this.speed
    )
  }

  updatePosition() {
    const { position: targetPosition } = this.targetNode
    if (targetPosition.length !== 2) return

    const dx = targetPosition[0] - this.position[0]
    const dy = targetPosition[1] - this.position[1]
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= this.speed) {
      if (this.hasArrived(this.homeNode)) {
        this.targetNode = this.parentNode
      } else {
        this.targetNode = this.homeNode
      }
    } else {
      this.position = [
        this.position[0] + (dx / distance) * this.speed,
        this.position[1] + (dy / distance) * this.speed
      ]
    }
  }
}
