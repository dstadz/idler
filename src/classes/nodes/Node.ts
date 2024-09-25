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
    this.ctx.fillText(
      this.emoji,
      this.position[0],
      this.position[1] + this.size,
    )

    this.ctx.font = `16px serif`
    Object.keys(this.resources)
      .filter(key => this.resources[key] > 0)
      .map(key => `${key}: ${this.resources[key]}`)
      .forEach((note, i) => {
        this.ctx.fillText(
          note,
          this.position[0],
          this.position[1] + this.size + 20 * (i + 1),
        )
      })
  }

}
