import { NodeTypeData, ResourceRecord } from '@/types/node'
import { defaultResources, getOreList, getResourceList } from '@/utils/constants'

export class CanvasNode {
  id: string
  ctx: CanvasRenderingContext2D
  position: [number, number]
  resources: ResourceRecord
  emoji: string
  size: number
  centerDrawPoint: () => [number, number]

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
    this.centerDrawPoint = () => [
      this.position[0] - size / 2,
      this.position[1] + size / 2,
    ]

  }

  showResources() {
    getResourceList({ resourceObject: this.resources })
    .filter(note => note !== '')
    .forEach((note, i) => {
      this.ctx.fillText(
        note,
        this.centerDrawPoint()[0],
        this.centerDrawPoint()[1] + 20 * (i + 1),
      )
    })
  }

  showOres() {
    getOreList({ resourceObject: this.resources })
    .filter(note => note !== '')
    .forEach((note, i) => {
      this.ctx.fillText(
        note,
        this.centerDrawPoint()[0],
        this.centerDrawPoint()[1] + 20 * (i + 1),
      )
    })
  }
  drawUnit() {
    console.log(this)
    this.ctx.font = `${this.size}px serif`
    this.ctx.fillText(this.emoji, ...this.centerDrawPoint())
    this.ctx.font = '16px serif'

    // this.showResources()
    // this.showOres()
  }
}
