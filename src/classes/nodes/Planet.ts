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
    size,
    resources,
    mineRateLevel,
    shipSpeedLevel,
    cargoLevel,
    // addToMainResources,
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
    this.mineRate = mineRates[mineRateLevel]
    this.shipSpeed = shipSpeeds[shipSpeedLevel]
    this.cargo = cargos[cargoLevel]

    // Initialize the ship (TransportNode) with valid parameters
    // this.ship = new TransportNode({
    //   id,
    //   ctx,
    //   size,
    //   emoji,
    //   parentNode: this,
    //   homeNode,
    //   speed: this.shipSpeed,
    //   strength: this.cargo,
    //   dexterity: 5000,
    //   resources,
    //   addToMainResources,
    // })
  }

  mine() {
    this.resources.ORE += this.mineRate
  }
}
