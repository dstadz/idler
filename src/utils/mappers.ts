import { CanvasNode } from "@/classes"

// Mapper to convert DB data to CanvasNode
export function mapDbToCanvasNode(dbData: any, ctx: CanvasRenderingContext2D): CanvasNode {
  const { id, xPos, yPos, entity, ...dbRest } = dbData.homeNode
  const { id: resourceId, entityId, ...resourceObj } = entity.resourceInventory
  const resources = Object.fromEntries(
    Object.entries(resourceObj).map(([key, value]) => [key.toUpperCase(), value])
  )


  return new CanvasNode({
    id,
    ctx,
    position: [xPos, yPos],
    resources,
    emoji: '🏠',
    size: 40,
  })
}

// export function mapCanvasNodeToDb(canvasNode: CanvasNode) {
//   const { id, position, resources } = canvasNode

//   return {
//     id,
//     xPos: position[0],
//     yPos: position[1],
//     resources: {
//       wood: resources.wood,
//       stone: resources.stone,
//       iron: resources.iron,
//       food: resources.food,
//       gold: resources.gold,
//       power: resources.power,
//       energy: resources.energy,
//       water: resources.water,
//     },
//   }
// }
