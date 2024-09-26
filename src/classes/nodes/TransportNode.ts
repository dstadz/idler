import { ResourceRecord } from '@/types/node'
import { Node, ResourceNode } from '../nodes'

export class TransportNode extends Node {
  // locked
  parentNode: ResourceNode
  homeNode: Node

  // dynamic
  targetNode: Node
  position: [number, number]
  resources: ResourceRecord
  isLoading: boolean = false

  // stats
  speed: number
  strength: number
  dexterity: number

  // state

  constructor({
    ctx,
    emoji,
    size,
    position,
    id,
    uuid,
    parentNode,
    homeNode,
    speed,
    strength,
    dexterity,
    resources,
  }: {
    ctx: CanvasRenderingContext2D
    emoji: string
    size: number
    position: [number, number]
    id: string
    uuid: string
    parentNode: ResourceNode
    homeNode: Node
    speed: number
    strength: number
    dexterity: number
    resources: ResourceRecord

  }) {

    super({ ctx, position: homeNode.position, emoji, size, resources, id, uuid })
    this.parentNode = parentNode
    this.position = position
    this.homeNode = homeNode
    this.targetNode = parentNode
    this.speed = speed
    this.strength = strength
    this.dexterity = dexterity
    this.resources = {} as ResourceRecord
    this.id = id
    this.uuid = uuid

  }

  drawUnit() {
    this.updatePosition()
    super.drawUnit()
  }
    /** -- WIP to flip the emoji when moving right
    this.ctx.save()
    const dx = this.targetNode.position[0] - this.position[0]
    const isMovingRight = dx > 0
    this.ctx.font = `${this.size}px serif`
    super.drawUnit()
    this.ctx.restore()
  }
    */

  handleArrival(targetNode = this.targetNode) {
    this.isLoading = true
    if (targetNode instanceof ResourceNode) {
      this.startLoading(targetNode)
    } else if (targetNode === this.homeNode) {
      this.startUnloading(targetNode)
    }
  }

  startLoading(targetNode: Node) {
    const loadingTime = 1000 / this.dexterity
    const availableResourceList = Object.keys(targetNode.resources).filter(key => targetNode.resources[key as keyof ResourceRecord] > 0)
    const ranIdx = Math.floor(Math.random() * availableResourceList.length)
    const resource = availableResourceList[ranIdx] as keyof ResourceRecord

    setTimeout(() => {
      if (!this.resources || !targetNode.resources || !(resource in targetNode.resources)) return

      const availableAmount = targetNode.resources[resource] || 0
      const transferAmount = Math.min(availableAmount, this.strength)

      if (!this.resources[resource]) {
        this.resources[resource] = 0
      }

      this.resources[resource] += transferAmount
      targetNode.resources[resource] -= transferAmount
      this.isLoading = false
      this.targetNode = this.homeNode
    }, loadingTime)
  }

  startUnloading(targetNode: Node) {
    const unloadingTime = 1000 / this.dexterity
    setTimeout(() => {
      this.deliverResources(targetNode)
      this.isLoading = false
      this.targetNode = this.parentNode
    }, unloadingTime)
  }

  deliverResources(targetNode: Node) {
    if (!this.resources || !targetNode.resources) return

    Object.keys(this.resources).forEach(resource => {
      const resKey = resource as keyof ResourceRecord

      if (!targetNode.resources[resKey]) {
        targetNode.resources[resKey] = 0
      }
      targetNode.resources[resKey] += this.resources[resKey]
      this.resources[resKey] = 0
    })
  }

  updatePosition() {
    if (this.isLoading) return
    const { position: targetPosition } = this.targetNode
    if (
      targetPosition?.length !== 2 ||
      this.position?.length !== 2
    ) return

    const dx = targetPosition[0] - this.position[0]
    const dy = targetPosition[1] - this.position[1]
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= this.speed) {
      this.handleArrival()
    } else {
      this.position = [
        this.position[0] + (dx / distance) * this.speed,
        this.position[1] + (dy / distance) * this.speed
      ]
    }
  }
}
