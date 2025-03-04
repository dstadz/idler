export { CanvasNode, ResourceNode, TransportNode, Planet } from './nodes'

export class Unit {
  id: string
  emoji: string
  size: number
  centerDrawPoint: () => [number, number]

  position: [number, number]
  targetNode: object
  buildingNodes: object[]

  // resources: ResourceRecord

  constructor({
    id,
    position,
    emoji = '❌',
    size = 10,

    //worldProps,
    ctx,
    buildingNodes,
    addToMainResources,

    }: NodeTypeData) {
    this.id = id
    this.position = position
    this.emoji = emoji
    this.size = size
    this.centerDrawPoint = () => [
      this.position[0] - size / 2,
      this.position[1] + size / 2,
    ]

    this.ctx = ctx
    this.buildingNodes = buildingNodes
    this.addToMainResources = addToMainResources

  }

  drawUnit(ctx: CanvasRenderingContext2D) {
    this.updatePosition()

    ctx.font = `${this.size}px serif`
    ctx.fillText(this.emoji, ...this.centerDrawPoint())
    ctx.font = '16px serif'
  }

  updatePosition(arrivalAction?: () => void) {
    const targetPosition = this.targetNode?.position
    // console.log(`🚀 ~ updatePosition ~ this:`, this)

    if (
      !targetPosition ||
      targetPosition?.length !== 2 ||
      this.position?.length !== 2
    ) return

    const dx = targetPosition[0] - this.position[0]
    const dy = targetPosition[1] - this.position[1]
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= this.levels.speed) {
      arrivalAction()
    } else {
      this.position = [
        this.position[0] + ((dx / distance)) * this.levels.speed,
        this.position[1] + ((dy / distance)) * this.levels.speed
      ]
    }
  }


  pickRandomBuilding() {
    this.targetNode = this.buildingNodes[Math.floor(Math.random() * this.buildingNodes.length)]
    console.log(`🚀 ~ pickRandomBuilding ~ ts.targetNode:`, this.targetNode)
  }
  randomCycle() {
    console.log(this.emoji, this.position, this)
    this.drawUnit()
    //  * 1. Pick a random target node
    //  * 2. Move to the target node
    this.updatePosition(this.pickRandomBuilding)
    //  * 3. If the target node is a resource node, load resources
    //  * 4. Move to the home node
    //  * 5. If the home node is a resource node, unload resources
    //  * 6. Repeat

  }
}
