export class Node {
  id: string
  ctx: CanvasRenderingContext2D
  position: [number, number]
  resources: {
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
    Object.keys(this.resources)
    .map(key => `${key}: ${this.resources[key]}`)
    .filter(Boolean)
    .forEach((note, i) => {
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
