export class CanvasElement {
  constructor({
    ctx,
    position,
    target,
    speed,
    node,
    size,
    children,
  }) {
    this.ctx = ctx
    this.position = position
    this.target = target
    this.speed = speed
    this.node = node
    this.size = size
    this.children = children
  }

  drawUnit() {
    this.ctx.font = this.size + 'px serif'
    this.ctx.fillText(this.node, this.position[0], this.position[1])
  }

  updatePosition() {
    const dx = this.target[0] - this.position[0]
    const dy = this.target[1] - this.position[1]
    const distance = Math.sqrt(dx * dx + dy * dy)

    this.position = [
      this.position[0] + (dx / distance) * this.speed,
      this.position[1] + (dy / distance) * this.speed
    ]
  }

  updateTarget(newTarget) {
    this.target = newTarget
  }
}
