import { Node, ResourceNode } from '../nodes'

function debounce(func, wait) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, 1000)
  }
}

export class TransportNode extends Node {
  // locked
  parentNode: ResourceNode
  homeNode: Node

  // dynamic
  targetNode: Node
  position: [number, number]
  resources: { stone?: number; wood?: number; food?: number } | undefined
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
    parentNode: ResourceNode
    homeNode: Node
    speed: number
    strength: number
    dexterity: number
  }) {

    super({ ctx, position: homeNode.position, emoji, size, resources, id, uuid })
    this.parentNode = parentNode
    this.position = position
    this.homeNode = homeNode
    this.targetNode = parentNode
    this.speed = speed
    this.strength = strength
    this.dexterity = dexterity
    this.resources = {}
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

  handleArrival(arrivalNode = this.targetNode) {
    this.isLoading = true
    console.log(`🚀  ~ handleArrival :`, this.isLoading, arrivalNode.emoji, arrivalNode.resources)

    if (arrivalNode instanceof ResourceNode) {
      const randResource = Object.keys(arrivalNode.resources)[Math.floor(Math.random() * Object.keys(arrivalNode.resources).length)]
      this.startLoading(arrivalNode, randResource)
    } else if (arrivalNode === this.homeNode) {
      this.startUnloading(arrivalNode)
    }
  }

  startLoading(targetNode: Node, resource: string) {
    console.log(`🚀  ~ startLoading ~:`, this.isLoading, targetNode.emoji, targetNode.resources)

    const loadingTime = 1000 / this.dexterity

    setTimeout(() => {
      if (!this.resources || !targetNode.resources || !(resource in targetNode.resources)) return

      const availableAmount = targetNode.resources[resource] || 0
      const transferAmount = Math.min(availableAmount, this.strength)
      console.log({
        this: this.emoji,
        target: targetNode.emoji,
        resource, transferAmount, availableAmount})

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
    console.log(`🚀  ~ startUnloading ~ :`, this.isLoading, targetNode.emoji, targetNode.resources)

    const unloadingTime = 1000 / this.dexterity
    setTimeout(() => {
      this.deliverResources(targetNode)
      this.isLoading = false
      this.targetNode = this.parentNode
    }, unloadingTime)
  }

  deliverResources(targetNode: Node) {
    console.log(`🚀  ~ deliverResources :`, this.isLoading,  targetNode.emoji, targetNode.resources)

    if (!this.resources || !targetNode.resources) return

    Object.keys(this.resources).forEach(resource => {
      if (!targetNode.resources[resource]) {
        targetNode.resources[resource] = 0
      }
      targetNode.resources[resource] += this.resources[resource]

      this.resources[resource] = 0

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
