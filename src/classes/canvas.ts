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
      this.ctx.font = `16px serif`
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
        position: this.position,
        emoji: transportNode.emoji,
        size: transportNode.size,
        speed: transportNode.speed,
        strength: transportNode.strength,
        dexterity: transportNode.dexterity,
      })
    }
  }

  drawUnit() { super.drawUnit() }
}

export class TransportNode extends Node {
  // locked
  parentNode: ResourceNode
  homeNode: { position: [number, number] }

  // dynamic
  targetNode: Node
  position: [number, number]
  resources: { stone?: number; wood?: number; food?: number } | undefined
  isLoading: boolean = false

  // stats
  speed: number
  strength: number
  dexterity: number

  constructor({
    ctx,
    emoji,
    size,
    position,
    id,
    parentNode,
    homeNode,
    speed,
    strength,
    dexterity,
    resources,
  }: {
    ctx: CanvasRenderingContext2D
    emoji: string
    size: number
    position: [number, number]
    id: string
    parentNode: ResourceNode
    homeNode: { position: [number, number] }
    speed: number
    strength: number
    dexterity: number
  }) {
    super({ ctx, position: homeNode.position, emoji, size, resources, id})
    this.parentNode = parentNode
    this.position = position
    this.homeNode = homeNode
    this.targetNode = parentNode
    this.speed = speed
    this.strength = strength
    this.dexterity = dexterity
    this.resources = {}
  }

  drawUnit() { super.drawUnit() }
    /** -- WIP to flip the emoji when moving right
    this.ctx.save()
    const dx = this.targetNode.position[0] - this.position[0]
    const isMovingRight = dx > 0
    this.ctx.font = `${this.size}px serif`
    super.drawUnit()
    this.ctx.restore()
  }
    */

  handleArrival(arrivalNode = this.targetNode) {
    this.isLoading = true

    if (arrivalNode instanceof ResourceNode) {
      const randResource = Object.keys(arrivalNode.resources)[Math.floor(Math.random() * Object.keys(arrivalNode.resources).length)]
      this.startLoading(arrivalNode, randResource)
    } else if (arrivalNode === this.homeNode) {
      this.startUnloading(arrivalNode)
    }
  }

  startLoading(targetNode: Node, resource: string) {
    const loadingTime = 1000 / this.dexterity

    setTimeout(() => {
      this.transferResources(targetNode, resource)
      this.isLoading = false
      this.targetNode = this.homeNode
    }, loadingTime)
  }

  startUnloading(targetNode: Node) {
    const unloadingTime = 1000 / this.dexterity
    setTimeout(() => {
      this.deliverResources(targetNode)
      this.isLoading = false
      this.targetNode = this.parentNode
    }, unloadingTime)
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
  }

  deliverResources(targetNode: Node) {
    if (!this.resources || !targetNode.resources) return

    // Deliver all resources from TransportNode to the target node (homeNode)
    Object.keys(this.resources).forEach(resource => {
      if (!targetNode.resources[resource]) {
        targetNode.resources[resource] = 0
      }
      targetNode.resources[resource] += this.resources[resource]

      // Clear resources in the TransportNode after delivery
      this.resources[resource] = 0
    })
  }

  hasArrived(node = this.targetNode): boolean {
    return (
      Math.abs(this.position[0] - node.position[0]) < this.speed &&
      Math.abs(this.position[1] - node.position[1]) < this.speed
    )
  }

  updatePosition() {
    if (this.isLoading) return
    const { position: targetPosition } = this.targetNode
    if (
      targetPosition?.length !== 2 ||
      this.position?.length !== 2
    ) return

    const dx = targetPosition[0] - this.position[0]
    const dy = targetPosition[1] - this.position[1]
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= this.speed) {
      this.handleArrival()
    } else {
      this.position = [
        this.position[0] + (dx / distance) * this.speed,
        this.position[1] + (dy / distance) * this.speed
      ]
    }

    this.drawUnit()
  }
}
