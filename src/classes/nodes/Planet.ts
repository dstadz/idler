import { CanvasNode } from './CanvasNode'
import { PlanetType, ResourceRecord } from '@/types/node'
import { TransportNode } from './TransportNode'




const mineRates = [1, 2, 3, 4, 5]
const shipSpeeds = [1, 2, 3, 4, 5]
const cargos = [1, 2, 3, 4, 5]

export class Planet extends CanvasNode {
  homeNode: CanvasNode
  yield: ResourceRecord
  mineRate: number
  shipSpeed: number
  cargo: number
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
    this.mineRate = mineRates[levels.mineRate]
    this.shipSpeed = shipSpeeds[levels.shipSpeed]
    this.cargo = cargos[levels.cargo]

    // Initialize the ship (TransportNode) with valid parameters
    this.ship = new TransportNode({
      id,
      ctx,
      size: 10,
      emoji: '🚀',
      homeNode,
      parentNode: this,
      speed: this.shipSpeed,
      strength: this.cargo,
      dexterity: 5,
      resources,
      addToMainResources,
    })
  }

  mine() {
    const randIdx = Math.floor(Math.random() * Object.keys(this.resources).length)
    const randResource = Object.keys(this.resources)[randIdx]
    this.resources[randResource] = Math.round(
      this.resources[randResource] * 1000 + this.mineRate
    ) / 1000
  }

  update() {
    this.mine()
  }
}
