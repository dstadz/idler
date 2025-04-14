import { ResourceRecord } from '@/types/node'
import { BuildingConfig, BuildingType, Resources } from '../types/game'

export const GRID_SIZE = 5
export const HEX_SIZE = 50
export const HEX_WIDTH = HEX_SIZE * 2
export const HEX_HEIGHT = Math.sqrt(3) * HEX_SIZE

export const STARTING_RESOURCES: Resources = {
  gold: 1000,
  wood: 500,
  stone: 500,
  food: 1000
}

export const BUILDING_OBJECTS: Record<BuildingType, BuildingConfig> = {
  HOME: {
    name: 'Home',
    description: 'Your main settlement building',
    EMOJI: '🏠',
    production: 0,
    maintenance: 0,
    constructionTime: 0,
    constructionCost: {
      gold: 0,
      wood: 0,
      stone: 0,
      food: 0
    },
    upgradeCost: {
      gold: 0,
      wood: 0,
      stone: 0,
      food: 0
    },
    maxLevel: 1
  },
  FARM: {
    name: 'Farm',
    description: 'Produces food for your settlement',
    EMOJI: '🌾',
    production: 10,
    maintenance: 2,
    constructionTime: 2,
    constructionCost: {
      gold: 100,
      wood: 50,
      stone: 20,
      food: 0
    },
    upgradeCost: {
      gold: 200,
      wood: 100,
      stone: 50,
      food: 0
    },
    maxLevel: 3
  },
  MINE: {
    name: 'Mine',
    description: 'Extracts stone and gold from the earth',
    EMOJI: '⛏️',
    production: 5,
    maintenance: 3,
    constructionTime: 3,
    constructionCost: {
      gold: 150,
      wood: 100,
      stone: 50,
      food: 0
    },
    upgradeCost: {
      gold: 300,
      wood: 150,
      stone: 100,
      food: 0
    },
    maxLevel: 3
  },
  LUMBER_MILL: {
    name: 'Lumber Mill',
    description: 'Processes wood from nearby forests',
    EMOJI: '🪓',
    production: 8,
    maintenance: 2,
    constructionTime: 2,
    constructionCost: {
      gold: 120,
      wood: 80,
      stone: 30,
      food: 0
    },
    upgradeCost: {
      gold: 240,
      wood: 120,
      stone: 60,
      food: 0
    },
    maxLevel: 3
  },
  MARKET: {
    name: 'Market',
    description: 'Trades resources with other settlements',
    EMOJI: '🏪',
    production: 15,
    maintenance: 5,
    constructionTime: 4,
    constructionCost: {
      gold: 200,
      wood: 150,
      stone: 100,
      food: 50
    },
    upgradeCost: {
      gold: 400,
      wood: 200,
      stone: 150,
      food: 100
    },
    maxLevel: 3
  },
  HOUSE: {
    name: 'House',
    description: 'Provides living space for your population',
    EMOJI: '🏠',
    production: 0,
    maintenance: 1,
    constructionTime: 1,
    constructionCost: {
      gold: 80,
      wood: 100,
      stone: 50,
      food: 0
    },
    upgradeCost: {
      gold: 160,
      wood: 200,
      stone: 100,
      food: 0
    },
    maxLevel: 3
  },
  BARRACKS: {
    name: 'Barracks',
    description: 'Trains and houses military units',
    EMOJI: '🏢',
    production: 0,
    maintenance: 10,
    constructionTime: 5,
    constructionCost: {
      gold: 300,
      wood: 200,
      stone: 150,
      food: 100
    },
    upgradeCost: {
      gold: 600,
      wood: 400,
      stone: 300,
      food: 200
    },
    maxLevel: 3
  }
}

export const TERRAIN_TYPES = ['grass', 'water', 'mountain', 'forest'] as const

export const GAME_SETTINGS = {
  gridSize: GRID_SIZE,
  startingResources: STARTING_RESOURCES,
  turnDuration: 60, // seconds
  constructionSpeed: 1, // units per second
  harvestInterval: 300 // seconds
}

export const NAV_TABS = [
  // {
  //   // icon: <LocalOffer />,
  //   title: 'Player',
  //   route: 'player',
  //   // matchPath: '/app/purchases/:id*',
  // },
  {
    // icon: ,
    title: 'Resources',
    route: 'resources',
  },
  {
    // icon: ,
    title: 'Crafting',
    route: 'crafting',
  },
  {
    // icon: ,
    title: 'Research',
    route: 'research',
  },
{
    // icon: <LocalOffer />,
    title: 'Civvies',
    route: 'civvies',
  },
  // {
  //   // icon: ,
  //   title: 'Achievements',
  //   route: 'achievements',
  // },
  {
    // icon: ,
    title: 'Store',
    route: 'store',
  },
  {
    // icon: ,
    title: 'Village',
    route: 'village',
  },
]

export const ORES = {
  COPPER: {
    NAME: 'Copper Ore',
    // EMOJI: '🪪',
    SELL_PRICE: 1,
  },
  IRON: {
    NAME: 'Iron Ore',
    // EMOJI: '🪙',
    SELL_PRICE: 2,
  },
  SILICA: {
    NAME: 'Silica',
    // EMOJI: '🪙',
    SELL_PRICE: 8,
  },
}

export const ALLOYS = {
  COPPER: {
    NAME: 'Copper Bar',
    UNLOCK_COST: 0,
    SELL_PRICE: 1450,
    TIME_TO_MAKE: 20,
    COST: [[ORES.COPPER, 1000]],
  },
  IRON: {
    NAME: 'Iron Bar',
    UNLOCK_COST: 3000,
    SELL_PRICE: 3000,
    TIME_TO_MAKE: 30,
    COST: [[ORES.IRON, 1000]],
  },
  SILICON: {
    NAME: 'Silicon Bar',
    UNLOCK_COST: 25000,
    SELL_PRICE: 12500,
    TIME_TO_MAKE: 60,
    COST: [[ORES.SILICA, 1000]],
  },

}

const ITEMS = {
  WIRE: {
    NAME: 'Copper Wire',
    UNLOCK_COST: 0,
    SELL_PRICE: 10000,
    TIME_TO_MAKE: 60,
    COST: [[ALLOYS.COPPER, 5]],
  },
  NAILS : {
    NAME: 'Iron Nails',
    UNLOCK_COST: 20000,
    SELL_PRICE: 20000,
    TIME_TO_MAKE: 120,
    COST: [[ALLOYS.IRON, 5]],
  },
  GLASS: {
    NAME: 'Glass',
    UNLOCK_COST: 200000,
    SELL_PRICE: 220000,
    TIME_TO_MAKE: 720,
    COST: [[ALLOYS.SILICON, 10]],
  },
}
ITEMS.BATTERY = {
  NAME: 'Battery',
  UNLOCK_COST: 50000,
  SELL_PRICE: 70000,
  TIME_TO_MAKE: 240,
  COST: [[ALLOYS.COPPER, 10], [ITEMS.WIRE, 2]],
}
ITEMS.CIRCIUT = {
  NAME: 'Circuit',
  UNLOCK_COST: 400000,
  SELL_PRICE: 620000,
  TIME_TO_MAKE: 960,
  COST: [
    [ALLOYS.SILICON, 10],
    [ALLOYS.IRON, 10], // ALUMINUM
    [ITEMS.WIRE, 10]
  ],
}
export { ITEMS }

export const PLANETS = [
  {
    planetName: 'Balor',
    emoji: '🪐',
    basePrice: 100,
    telescopeNumber: 'Default',
    position: [0, 1], // [x, y]
    levels: {
      mineRate: 1,
      speed: 1,
      cargo: 3,
    },
    resources: {
      [ORES.COPPER.NAME]: 5,
      [ORES.IRON.NAME]: 5,
    },
    yields: {
      [ORES.COPPER.NAME]: 50,
      [ORES.IRON.NAME]: 50,
    },
  },
  {
    planetName: 'Drasta',
    emoji: '🌼',
    basePrice: 200,
    telescopeNumber: 'Default',
    levels: {
      mineRate: 1,
      speed: 1,
      cargo: 2,
    },
    resources: {
      [ORES.IRON.NAME]: 5,
      [ORES.SILICA.NAME]: 5,
    },
    yields: {
      [ORES.IRON.NAME]: 50,
      [ORES.SILICA.NAME]: 50,
    },
    position: [400, 400],
  },
]

export const RESOURCES = {
  STONE: { NAME: 'Stone', EMOJI: '🪨' },
  WOOD: { NAME: 'Wood', EMOJI: '🪵' },
  FOOD: { NAME: 'Food', EMOJI: '🍎' },
  GOLD: { NAME: 'Gold', EMOJI: '🪙' },
  POWER: { NAME: 'Power', EMOJI: '⚡️' },
  ENERGY: { NAME: 'Energy', EMOJI: '✨' },
  WATER: { NAME: 'Water', EMOJI: '💧' },
  IRON: { NAME: 'Iron', EMOJI: '⛓️' },
}

export const defaultResources: ResourceRecord = Object.keys(RESOURCES).reduce((acc, key) => {
  acc[key as keyof ResourceRecord] = 0
  return acc
}, {} as ResourceRecord)

export const RESOURCES_KEYS = Object.keys(RESOURCES) as (keyof typeof RESOURCES)[]

export const getResourceList = ({
  resourceObject = defaultResources,
}) => {
  if (!resourceObject) return []
  const resourceList = Object.keys(resourceObject)
    .filter(key => resourceObject[key as keyof ResourceRecord] > 0)
    .map(key => {
      const upperKey = key.toUpperCase()
      if (upperKey in RESOURCES) {
        const emoji = RESOURCES[upperKey as keyof typeof RESOURCES].EMOJI
        return `${emoji}: ${resourceObject[key as keyof ResourceRecord]}`
      }
      return ''
    })
  return resourceList
}

export const getOreList = ({
  resourceObject = defaultResources,
}) => {
  if (!resourceObject) return []
  const resourceList = Object.keys(resourceObject)
    .filter(key => resourceObject[key] > 0)
    .map(key =>  `${key}: ${resourceObject[key]}`)
  return resourceList
}

export const TILE_OBJECTS = {
  GRASS: {
    NAME: 'Grass',
    EMOJI: '🌿',
  },
  SEA: {
    NAME: 'Sea',
    EMOJI: '🌊',
  },
  FOREST: {
    NAME: 'Forest',
    EMOJI: '🌲',
  },
  JUNGLE: {
    NAME: 'Jungle',
    EMOJI: '🌲',
  },
  DIRT: {
    NAME: 'Dirt',
    EMOJI: '🌱',
  },
  STONE: {
    NAME: 'Stone',
    EMOJI: '🪨',
  },
}

export const BUILDING_OBJECTS_old = {
  MINE: {
    NAME: 'Mine',
    EMOJI: '⛏️',
  },
  FARM: {
    NAME: 'Farm',
    EMOJI: '🌾',
  },
  FACTORY: {
    NAME: 'Factory',
    EMOJI: '🏭',
  },
  STORAGE: {
    NAME: 'Storage',
    EMOJI: '📦',
  },
  VILLAGE: {
    NAME: 'Village',
    level: [{ icon: '🏕️'}, { icon: '🏡' }, { icon: '🏰' }],
  },
  HOME: {
    NAME: 'Home',
    level: [ { icon: '🏡' }, { icon: '🏰' }],

  }
  // BARRACKS: {
  //   NAME: 'Barracks',
  //   EMOJI: '🏢',
  // },
  // WORKSHOP: {
  //   NAME: 'Workshop',
  //   EMOJI: '🏭',
  // },
  // PORT: {
  //   NAME: 'Port',
  //   EMOJI: '🚤',
  // },
  // REFINERY: 'REFINERY',
  // POWERPLANT: 'POWERPLANT',
  // AIRPLANT: 'AIRPLANT',
}
export const TILE_OBJECTS_KEYS = Object.keys(TILE_OBJECTS)
export const BUILDING_KEYS = Object.keys(BUILDING_OBJECTS)

/**
const NODES ={
  RAW > REFINED > INGRIDIENT
  iron ore > ingot > steel
  fish > meat > sushi
  sand > glass > glasswear/mirror
  oil > rubber > tire
  wood > logs > lumber
  sugarcane > sugar > syrup
  wool > yarn > fabric
  milk > cheese > butter

}
*/


export const hexWidth = 60
export const hexHeight = hexWidth * (Math.sqrt(3)/2)

export const radiateFromXYAtoB = (a, b, x = 50, y = 50 ) => `
  radial-gradient(circle at ${x}% ${y}%, ${a}, ${b})`

export const tileBackgrounds = {
  GRASS : radiateFromXYAtoB(
    'hsl(120, 70%, 60%)',  // Brighter, more vibrant green
    'hsl(120, 50%, 45%)'), // Slightly darker but still bright
  JUNGLE: radiateFromXYAtoB(
    'hsl(140, 70%, 50%)',  // Rich, vibrant jungle green
    'hsl(140, 60%, 35%)'), // Deep but not too dark
  FOREST: radiateFromXYAtoB(
    'hsl(135, 50%, 40%)',  // Warm forest green
    'hsl(135, 60%, 25%)'), // Deep forest shade
  DIRT  : radiateFromXYAtoB(
    'hsl(35, 70%, 60%)',   // Warm, sandy brown
    'hsl(35, 50%, 45%)'),  // Rich earth tone
  SAND  : radiateFromXYAtoB(
    'hsl(45, 80%, 85%)',   // Bright, warm sand
    'hsl(45, 60%, 75%)'),  // Soft sand tone
  STONE : radiateFromXYAtoB(
    'hsl(200, 20%, 60%)',  // Soft, cool gray
    'hsl(200, 30%, 45%)'), // Deep slate
  SEA   : radiateFromXYAtoB(
    'hsla(200, 70%, 50%, 0.7)',  // Bright, tropical blue
    'hsla(200, 60%, 40%, 0.9)'), // Deep ocean blue
}

export const unitData = [
  {
    id: 'unit1',
    size: 32,
    emoji: "🦁",
    position: [100, 100],
    levels: { speed: 3, cargo: 1, dexterity: 3 },
  },
  {
    id: 'unit2',
    size: 32,
    emoji: "🐘",
    position: [500, 100],
    levels: { speed: 1, cargo: 3, dexterity: 1 },
  },
  {
    id: 'unit3',
    size: 32,
    emoji: "🐉",
    position: [200, 400],
    levels: { speed: 1, cargo: 1, dexterity: 3 },
  },
  {
    id: 'unit4',
    size: 32,
    emoji: "🪼",
    position: [100, 400],
    levels: { speed: 2, cargo: 2, dexterity: 2 },
  },
]

export const NODES: Record<string, NodePath> = {
  IRON: {
    raw: {
      id: 'iron_ore',
      name: 'Iron Ore',
      type: 'RAW',
      emoji: '🪨',
      baseValue: 1,
      processingTime: 1,
      produces: [{ resource: 'IRON_ORE', quantity: 1 }]
    },
    refined: {
      id: 'iron_ingot',
      name: 'Iron Ingot',
      type: 'REFINED',
      emoji: '⛓️',
      baseValue: 2,
      processingTime: 2,
      requiredResources: [{ resource: 'IRON_ORE', quantity: 2 }],
      produces: [{ resource: 'IRON_INGOT', quantity: 1 }]
    },
    ingredient: {
      id: 'steel',
      name: 'Steel',
      type: 'INGREDIENT',
      emoji: '🔩',
      baseValue: 5,
      processingTime: 3,
      requiredResources: [
        { resource: 'IRON_INGOT', quantity: 2 },
        { resource: 'COAL', quantity: 1 }
      ],
      produces: [{ resource: 'STEEL', quantity: 1 }]
    }
  },
  COPPER: {
    raw: {
      id: 'copper_ore',
      name: 'Copper Ore',
      type: 'RAW',
      emoji: '🪨',
      baseValue: 1,
      processingTime: 1,
      produces: [{ resource: 'COPPER_ORE', quantity: 1 }]
    },
    refined: {
      id: 'copper_ingot',
      name: 'Copper Ingot',
      type: 'REFINED',
      emoji: '🔶',
      baseValue: 2,
      processingTime: 2,
      requiredResources: [{ resource: 'COPPER_ORE', quantity: 2 }],
      produces: [{ resource: 'COPPER_INGOT', quantity: 1 }]
    },
    ingredient: {
      id: 'copper_wire',
      name: 'Copper Wire',
      type: 'INGREDIENT',
      emoji: '🔌',
      baseValue: 4,
      processingTime: 2,
      requiredResources: [{ resource: 'COPPER_INGOT', quantity: 1 }],
      produces: [{ resource: 'COPPER_WIRE', quantity: 2 }]
    }
  },
  WOOD: {
    raw: {
      id: 'wood',
      name: 'Wood',
      type: 'RAW',
      emoji: '🪵',
      baseValue: 1,
      processingTime: 1,
      produces: [{ resource: 'WOOD', quantity: 1 }]
    },
    refined: {
      id: 'lumber',
      name: 'Lumber',
      type: 'REFINED',
      emoji: '📦',
      baseValue: 2,
      processingTime: 2,
      requiredResources: [{ resource: 'WOOD', quantity: 2 }],
      produces: [{ resource: 'LUMBER', quantity: 1 }]
    },
    ingredient: {
      id: 'furniture',
      name: 'Furniture',
      type: 'INGREDIENT',
      emoji: '🪑',
      baseValue: 5,
      processingTime: 3,
      requiredResources: [
        { resource: 'LUMBER', quantity: 3 },
        { resource: 'NAILS', quantity: 1 }
      ],
      produces: [{ resource: 'FURNITURE', quantity: 1 }]
    }
  },
  FOOD: {
    raw: {
      id: 'wheat',
      name: 'Wheat',
      type: 'RAW',
      emoji: '🌾',
      baseValue: 1,
      processingTime: 1,
      produces: [{ resource: 'WHEAT', quantity: 1 }]
    },
    refined: {
      id: 'flour',
      name: 'Flour',
      type: 'REFINED',
      emoji: '🌾',
      baseValue: 2,
      processingTime: 2,
      requiredResources: [{ resource: 'WHEAT', quantity: 2 }],
      produces: [{ resource: 'FLOUR', quantity: 1 }]
    },
    ingredient: {
      id: 'bread',
      name: 'Bread',
      type: 'INGREDIENT',
      emoji: '🍞',
      baseValue: 4,
      processingTime: 2,
      requiredResources: [
        { resource: 'FLOUR', quantity: 1 },
        { resource: 'WATER', quantity: 1 }
      ],
      produces: [{ resource: 'BREAD', quantity: 2 }]
    }
  }
}
