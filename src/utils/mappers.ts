import { CanvasNode } from '@/classes'
import { ResourceRecord } from '@/types/node'
import { defaultResources } from './constants'
import { ApiResponse } from '@/interfaces'

// Mapper to convert DB data to CanvasNode
export function mapDbToCanvasNode(dbData: ApiResponse, ctx: CanvasRenderingContext2D): CanvasNode {
  const { id, xPos, yPos, entity } = dbData.homeNode
  const resourceObj = entity.resourceInventory
  delete resourceObj.id
  delete resourceObj.entityId

  const resources: ResourceRecord = {
    // ...defaultResources,
    // ...Object.fromEntries(
    //   Object.entries(resourceObj).map(([key, value]) => [key.toUpperCase(), value])
    // )
  }

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
