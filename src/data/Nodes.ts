import { RESOURCES } from "@/utils/contants"

export const homeNodeData: NodeType = {
  position: [400, 400],
  emoji: '🏰',
  size: 40,
  resources: {
    [RESOURCES.FOOD.emoji]: 2000,
    [RESOURCES.WOOD.emoji]: 1000,
  },}

export const resourceNodesData: ResourceNodeType[] = [
  {
    position: [100, 150],
    emoji: '🌋',
    size: 40,
    resources: {
      [RESOURCES.STONE.emoji]: 2000,
    },
    transportNode: {
      speed: 0.9,
      emoji: '🐉',
      size: 16 ,
      strength: 2,
      dexterity: 5,
    },
  }, {
    position: [600, 200],
    emoji: '🌲',
    size: 40,
    resources: {
      [RESOURCES.FOOD.emoji]: 2000,
      [RESOURCES.WOOD.emoji]: 1000,
    },
    transportNode: {
      speed: 1.25,
      emoji: '🦄',
      size: 16,
      strength: 5,
      dexterity: 2,
    },
  }
]
