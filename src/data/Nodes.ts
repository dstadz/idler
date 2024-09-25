import { RESOURCES } from "@/utils/contants"

export const homeNodeData: NodeType = {
  id: 'homeNode',
  position: [400, 400],
  emoji: '🏰',
  size: 40,
  resources: {
    [RESOURCES.FOOD.emoji]: 2000,
    [RESOURCES.WOOD.emoji]: 1000,
  },}

export const resourceNodesData: ResourceNodeType[] = [
  {
    id: 'resourceNode1',
    position: [100, 150],
    emoji: '🌋',
    size: 40,
    resources: {
      [RESOURCES.STONE.emoji]: 2000,
    },
  }, {
    id: 'resourceNode2',
    position: [600, 200],
    emoji: '🌲',
    size: 40,
    resources: {
      [RESOURCES.FOOD.emoji]: 2000,
      [RESOURCES.WOOD.emoji]: 1000,
    },
  }
]

export const transportNodesData: TransportNodeType[] = [
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
