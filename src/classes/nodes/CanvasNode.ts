import { NodeTypeData, ResourceRecord } from '@/types/node'
import { defaultResources } from '@/utils/constants'

export class CanvasNode {
  id: string
  position: [number, number]
  resources: ResourceRecord
  emoji: string
  size: number
  centerDrawPoint: () => [number, number]

  constructor({
    id,
    position = [0,0],
    resources = defaultResources,
    emoji = '❌',
    size = 10,
    }: NodeTypeData) {
    this.id = id
    this.position = position
    this.resources = resources
    this.emoji = emoji
    this.size = size
    this.centerDrawPoint = () => [
      this.position[0] - size / 2,
      this.position[1] + size / 2,
    ]

  }

  drawUnit(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.size}px serif`
    ctx.fillText(this.emoji, ...this.centerDrawPoint())
    ctx.font = '16px serif'

    // this.showResources()
    // this.showOres()
  }
}
