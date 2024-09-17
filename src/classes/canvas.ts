export class CanvasElement {
  constructor({
    ctx,
    position,
    emoji,
    size,
    id,
  }) {
    this.ctx = ctx
    this.position = position
    this.emoji = emoji
    this.size = size
    this.id = id
  }

  drawUnit() {
    this.ctx.font = this.size + 'px serif'
    this.ctx.fillText(this.emoji, this.position[0], this.position[1])
    // this.ctx.fillText(`[${Math.round(this.position[0])}, ${Math.round(this.position[1])}]`, this.position[0], this.position[1] + 40)
  }
}

export class ResourceNode extends CanvasElement {
  constructor({
    ctx,
    position,
    homeNode,
    emoji,
    size,
    transportNode,
    id,
  }) {
    super({
      ctx,
      position,
      size,
      emoji,
      id,
    })

    this.homePosition = homeNode
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
    } else {
      this.isHome = true
    }
  }

  drawUnit() {
    super.drawUnit()
  }
}

export class TransportNode extends CanvasElement {
  constructor({
    ctx,
    emoji,
    size,
    id,
    parentNode,
    homeNode,
    speed,
  }) {
    super({
      ctx,
      position: homeNode.position,
      emoji,
      size,
      id,
    })
    this.parentNode = parentNode
    this.homeNode = homeNode
    this.target = parentNode.position
    this.speed = speed
  }

  drawUnit() {
    this.ctx.save()
    const dx = this.target[0] - this.position[0]
    const isMovingRight = dx > 0
    // if (isMovingRight) this.ctx.scale(-1, 1)
    this.ctx.font = this.size + 'px serif'
    super.drawUnit()
    this.ctx.restore()
  }

  // Method to update the position based on speed
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


  hasArrived() {
    return this.position[0] === this.target[0] && this.position[1] === this.target[1]
  }
}
