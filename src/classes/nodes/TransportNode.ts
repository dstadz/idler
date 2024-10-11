import { NodeType, ResourceRecord, TransportNodeType } from '@/types/node'
import { CanvasNode, ResourceNode } from '../nodes'

export class TransportNode extends CanvasNode {
  // locked
  parentNode?: ResourceNode
  homeNode: NodeType

  // dynamic
  targetNode: NodeType
  resources: ResourceRecord
  isLoading: boolean = false

  // stats
  speed: number
  strength: number
  dexterity: number

  // state
  addToMainResources: (resource: keyof ResourceRecord, amount: number) => void

  constructor({
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
  }: TransportNodeType) {
    super({
      ctx,
      position: homeNode.position,
      emoji,
      size,
      resources,
      id,
    })
    this.homeNode = homeNode
    this.parentNode = parentNode || undefined
    this.speed = speed
    this.strength = strength
    this.dexterity = dexterity
    this.targetNode = parentNode || homeNode
    this.resources = {} as ResourceRecord
    this.addToMainResources = addToMainResources
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

  handleArrival() {
    this.isLoading = true
    if (this.targetNode instanceof ResourceNode) {
      this.startLoading()
    } else if (this.targetNode === this.homeNode) {
      this.startUnloading()
    }
  }

  startLoading() {
    const loadingTime = 1000 / this.dexterity
    const availableResourceList = Object.keys(this.targetNode.resources).filter(key => this.targetNode.resources[key as keyof ResourceRecord] > 0)

    if (availableResourceList.length === 0) {
        this.isLoading = false
        return
    }

    const ranIdx = Math.floor(Math.random() * availableResourceList.length)
    const resource = availableResourceList[ranIdx] as keyof ResourceRecord

    setTimeout(() => {
        if (!this.resources || !this.targetNode.resources || !(resource in this.targetNode.resources)) return

        const availableAmount = this.targetNode.resources[resource] || 0
        const transferAmount = Math.min(availableAmount, this.strength)

        this.resources[resource] = (this.resources[resource] || 0) + transferAmount
        this.targetNode.resources[resource] -= transferAmount
        this.isLoading = false
        this.targetNode = this.homeNode
    }, loadingTime)
}

  startUnloading() {
    const unloadingTime = 1000 / this.dexterity
    setTimeout(() => {
      this.deliverResources()
      this.isLoading = false
      this.targetNode = this.parentNode || this.homeNode
    }, unloadingTime)
  }

  deliverResources() {
    if (!this.resources || !this.targetNode.resources) return

    Object.keys(this.resources).forEach(resource => {
      const resKey = resource as keyof ResourceRecord
      const amount = this.resources[resKey]

      if (!this.targetNode.resources[resKey]) {
        this.targetNode.resources[resKey] = 0
      }
      this.targetNode.resources[resKey] += this.resources[resKey]
      this.addToMainResources(resKey, amount)
      this.resources[resKey] = 0
    })
  }
  updatePosition() {
    if (this.isLoading) return

    const targetPosition = this.targetNode?.position

    if (
      !targetPosition ||
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
