import { CanvasNode } from './CanvasNode'
import { PlanetType, ResourceRecord } from '@/types/node'
import { TransportNode } from './TransportNode'

export class Planet extends CanvasNode {
  homeNode: CanvasNode
  levels: number[]

  yields: ResourceRecord
  ship: TransportNode

  constructor({
    id,
    ctx,
    position,
    homeNode,
    emoji,
    size = 40,
    resources,
    levels,
    yields,
    addToMainResources,
  }: PlanetType) {
    super({
      id,
      ctx,
      position,
      size,
      emoji,
      resources,
    })

    this.homeNode = homeNode
    this.levels = levels

    this.yields = yields

    this.ship = new TransportNode({
      id,
      ctx,
      size: 10,
      emoji: '🚀',
      homeNode,
      position: homeNode.position,
      parentNode: this,
      speed: this.levels.shipSpeed,
      strength: this.levels.cargo,
      dexterity: 5,
      resources: { ...this.resources },
      addToMainResources,
    })
  }

  mine() {
    const randIdx = Math.floor(Math.random() * Object.keys(this.resources).length)
    const randResource = Object.keys(this.resources)[randIdx] as keyof ResourceRecord // Type assertion here
    this.resources[randResource] = Math.round(
      this.resources[randResource] * 1000 + this.levels.mineRate
    ) / 1000
  }

  update() {
    this.mine()
  }

  drawUnit(): void {
    super.drawUnit()
  }
}
