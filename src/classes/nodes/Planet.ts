import { CanvasNode } from './CanvasNode'
import { PlanetType } from '@/types/node'
import { TransportNode } from './TransportNode'

export class Planet extends CanvasNode {
  homeNode: CanvasNode

  constructor({
    id,
    ctx,
    position,
    homeNode,
    emoji,
    size,
    resources,
    mineRate,
    shipSpeed,
    cargo,
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
    this.mineRate = mineRate
    this.shipSpeed = shipSpeed
    this.cargo = cargo
    this.ship = new TransportNode({
      ctx,
      emoji,
      size,
      id,
      parentNode,
      homeNode,
      speed,
      strength,
      dexterity,
      resources,
      addToMainResources,
    })
  }

 
}
