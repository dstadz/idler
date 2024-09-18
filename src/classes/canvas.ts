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
    this.notes = [
      ...Object.keys(this.resources).map(key => `${key}: ${this.resources[key]}`),
    ].filter(Boolean)

    this.notes.map((note, i) => {
      this.ctx.fillText(note, this.position[0], this.position[1] + 20 * (i + 1))
    })
  }

  transferResources(targetNode: Node, resource: string) {
    if (!this.resources || !targetNode.resources || !(resource in targetNode.resources)) return

    const availableAmount = targetNode.resources[resource] || 0
    const transferAmount = Math.min(availableAmount, this.strength)

    // Transfer resource from targetNode to this node
    if (!this.resources[resource]) {
      this.resources[resource] = 0
    }

    this.resources[resource] += transferAmount
    targetNode.resources[resource] -= transferAmount

    console.log(`${transferAmount} ${resource} transferred from ${targetNode.emoji} to ${this.emoji}`)
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
  resources: { stone?: number; wood?: number; food?: number } | undefined

  // stats
  speed: number
  dexterity: number
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
    this.targetNode = parentNode
    this.speed = speed
    this.strength = strength
    this.resources = {}  // Initialize with empty resources
  }

  drawUnit() {
    this.ctx.save()
    const dx = this.targetNode.position[0] - this.position[0]
    const isMovingRight = dx > 0
    this.ctx.font = `${this.size}px serif`
    super.drawUnit()
    this.ctx.restore()
  }

  handleArrival(arrivalNode = this.targetNode) {
    console.log('arrived at', arrivalNode.emoji)

    // Check if arriving at a ResourceNode (to collect resources)
    if (arrivalNode instanceof ResourceNode) {
      const resourceToTransfer = "stone" // Example, you can dynamically choose a resource
      this.transferResources(arrivalNode, resourceToTransfer)

      // Set target back to home node to deliver payload
      this.targetNode = this.homeNode

    // Check if arriving at home node (to deliver resources)
    } else if (arrivalNode === this.homeNode) {
      this.deliverResources(arrivalNode)

      // Set target back to parentNode to collect more resources
      this.targetNode = this.parentNode
    }
  }

  transferResources(targetNode: Node, resource: string) {
    if (!this.resources || !targetNode.resources || !(resource in targetNode.resources)) return

    const availableAmount = targetNode.resources[resource] || 0
    const transferAmount = Math.min(availableAmount, this.strength)

    // Add the resource to the TransportNode's payload (this.resources)
    if (!this.resources[resource]) {
      this.resources[resource] = 0
    }
    this.resources[resource] += transferAmount
    targetNode.resources[resource] -= transferAmount

    console.log(`${transferAmount} ${resource} collected from ${targetNode.emoji} by ${this.emoji}`)
  }

  deliverResources(targetNode: Node) {
    if (!this.resources || !targetNode.resources) return

    // Deliver all resources from TransportNode to the target node (homeNode)
    Object.keys(this.resources).forEach(resource => {
      if (!targetNode.resources[resource]) {
        targetNode.resources[resource] = 0
      }
      targetNode.resources[resource] += this.resources[resource]
      console.log(`${this.resources[resource]} ${resource} delivered to ${targetNode.emoji}`)

      // Clear resources in the TransportNode after delivery
      this.resources[resource] = 0
    })

    console.log(`Payload delivered by ${this.emoji}`)
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
      this.handleArrival()
      if (this.hasArrived(this.parentNode)) {
        this.targetNode = this.homeNode
      } else {
        this.targetNode = this.parentNode
      }
    } else {
      this.position = [
        this.position[0] + (dx / distance) * this.speed,
        this.position[1] + (dy / distance) * this.speed
      ]
    }
  }
}
