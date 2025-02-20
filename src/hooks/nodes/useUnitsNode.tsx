import { unitNodesAtom } from "@/atoms"
import { useAtom } from "jotai"
import { NodeType, ResourceRecord, TransportNodeType } from '@/types/node'
import { CanvasNode } from "@/classes"
// import { CanvasNode, Planet, ResourceNode } from '../nodes'

export const useUnitsNode = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  const [unitNodes, setUnitNodes] = useAtom(unitNodesAtom)

  getUnitNodes = async (mapId) => {
    if (!mapId) return

    setUnitNodes([{
      type: 'UNIT',
      status: 'active',
      level: 1,
      map_id: mapId,
      position: [10, 2],
    }])
  }

  return {
    unitNodes,
    getUnitNodes,
  }
}


export class UnitNode extends CanvasNode {
  homeNode: NodeType
  parentNode?: ResourceNode
  targetNode: NodeType
  // position: [number, number]
  isLoading: boolean
  levels: {
    speed: number
    cargo: number
  }
  dexterity: number
  // resources: ResourceRecord
  addToMainResources: (resource: keyof ResourceRecord, amount: number) => void

  constructor({
    id,
    ctx,
    size = 10,
    emoji = '❌',
    homeNode,
    parentNode,
    targetNode = parentNode,
    isLoading = false,
    levels,
    dexterity = 1,
    addToMainResources,
  }: TransportNodeType) {
    super({
      ctx,
      position: homeNode.position,
      emoji,
      size,
      resources: {},
      id,
    })
    this.homeNode = homeNode
    this.parentNode = parentNode
    this.targetNode = targetNode
    this.isLoading = isLoading
    this.levels = {
      speed: levels.speed,
      cargo: levels.cargo
    }
    this.dexterity = dexterity
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
    if (
      this.targetNode instanceof ResourceNode ||
      this.targetNode instanceof Planet
    ) {
      this.startLoading()
    } else if (this.targetNode === this.homeNode) {
      this.startUnloading()
    }
  }

  startLoading() {
    const loadingTime = 1000 / this.dexterity
    const availableResourceList = Object.keys(this.targetNode.resources)
      .filter(key => this.targetNode.resources[key as keyof ResourceRecord] > 1)

    if (availableResourceList.length === 0) {
        this.isLoading = false
        return
    }

    const ranIdx = Math.floor(Math.random() * availableResourceList.length)
    const resource = availableResourceList[ranIdx] as keyof ResourceRecord

    setTimeout(() => {
        if (!this.resources || !this.targetNode.resources || !(resource in this.targetNode.resources)) return

        this.isLoading = false
        const availableAmount = this.targetNode.resources[resource] || 0
        const transferAmount = Math.min(Math.floor(availableAmount), this.levels.cargo)

        this.resources[resource] = (this.resources[resource] || 0) + transferAmount
        this.targetNode.resources[resource] -= transferAmount
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

    if (distance <= this.levels.speed) {
      this.handleArrival()
    } else {
      this.position = [
        this.position[0] + ((dx / distance)) * this.levels.speed,
        this.position[1] + ((dy / distance)) * this.levels.speed
      ]
    }
  }

  updateSkill(skill: string) {
    this.levels[skill] += 1
  }
}
