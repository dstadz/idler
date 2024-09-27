import {
  NodeType,
  NodeTypeData,
  ResourceRecord,
  TransportNodeType,
  TransportNodeTypeData,
} from "@/types/node"
import { RESOURCES, RESOURCES_KEYS } from "@/utils/contants"

export const homeNodeData: NodeTypeData = {
  id: 'homeNode',
  position: [400, 400],
  emoji: '🏰',
  size: 40,
  resources: {
    ...(Object.fromEntries(
      Object.keys(RESOURCES).map(key => [key, 0])
    ) as ResourceRecord),
    [RESOURCES.FOOD.NAME.toUpperCase()]: 1000,
    [RESOURCES.WOOD.NAME.toUpperCase()]: 1000,
  }
}


export const resourceNodesData: NodeTypeData[] = [
  {
    id: 'resourceNode1',
    position: [100, 150],
    emoji: '🌋',
    size: 40,
    resources: {
      ...(Object.fromEntries(
        Object.keys(RESOURCES).map(key => [key, 0])
      ) as ResourceRecord),
      [RESOURCES.STONE.NAME.toUpperCase()]: 2000,
    },
  }, {
    id: 'resourceNode2',
    position: [600, 200],
    emoji: '🌲',
    size: 40,
    resources: {
      ...(Object.fromEntries(
        Object.keys(RESOURCES).map(key => [key, 0])
      ) as ResourceRecord),
      [RESOURCES.FOOD.NAME.toUpperCase()]: 2000,
      [RESOURCES.WOOD.NAME.toUpperCase()]: 1000,
    },
  }
]

export const transportNodesData: TransportNodeTypeData[] = [
  {
    id: 'transportNode1',
    parentId: 'resourceNode1',
    speed: 0.9,
    emoji: '🐉',
    size: 16 ,
    strength: 2,
    dexterity: 5,
  }, {
    id: 'transportNode2',
    parentId: 'resourceNode2',
    speed: 1.25,
    emoji: '🦄',
    size: 16,
    strength: 5,
    dexterity: 2,
  }
]
