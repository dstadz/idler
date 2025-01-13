import { CanvasNode } from './CanvasNode'
import { PlanetType, ResourceRecord } from '@/types/node'
import { TransportNode } from './TransportNode'


const hexWidth = 80
const hexHeight = hexWidth * (Math.sqrt(3)/2)

export class Planet extends CanvasNode {
  homeNode: CanvasNode
  levels: Record<string, number>

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

    this.shipStats = {
      id,
      ctx,
      size: 10,
      emoji: '🚀',
      homeNode,
      position: homeNode.position,
      parentNode: this,
      levels,
      dexterity: 5,
      resources: { ...this.resources },
      addToMainResources,
    }

    this.ship = new TransportNode(this.shipStats)
  }

  mine() {
    const randIdx = Math.floor(Math.random() * Object.keys(this.resources).length)
    const randResource = Object.keys(this.resources)[randIdx] as keyof ResourceRecord
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

  updateShip() {
    this.ship.levels = this.levels
  }
  updateSkill(skill: string) {
    this.levels[skill] += 1
    if (['speed', 'cargo'].includes(skill)) {
      this.updateShip()
    }
  }

  setHexCoordinates() {
    this.position = [
      hexWidth / 2 + this.position[0] * hexWidth + (this.position[1] % 2 ? hexWidth / 2 : 0),
      hexHeight / 2 + this.position[1] * hexHeight * .75
    ]
  }
}
