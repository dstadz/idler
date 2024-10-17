import { NodeTypeData, ResourceRecord } from '@/types/node'
import { defaultResources, getResourceList } from '@/utils/constants'

export class CanvasNode {
  id: string
  ctx: CanvasRenderingContext2D
  position: [number, number]
  resources: ResourceRecord
  emoji: string
  size: number

  constructor({
    id,
    ctx,
    position = [0,0],
    resources = defaultResources,
    emoji = '❌',
    size = 10,
    }: NodeTypeData) {
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

    // this.ctx.font = '16px serif'
    // getResourceList({ resourceObject: this.resources })
    // .filter(note => note !== '')
    // .forEach((note, i) => {
    //   this.ctx.fillText(
    //     note,
    //     this.position[0],
    //     this.position[1] + this.size + 20 * (i + 1),
    //   )
    // })
  }
}
