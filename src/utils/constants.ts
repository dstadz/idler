import { ResourceRecord } from '@/types/node'

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

export const BUILDING_OBJECTS = {
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
    EMOJI: '🏰',
  },
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
    'hsl( 96, 50%, 50%)',
    'hsl( 96, 35%, 40%)'),
  JUNGLE: radiateFromXYAtoB(
    'hsl(140, 50%, 45%)',
    'hsl(140, 60%, 25%)'),
  FOREST: radiateFromXYAtoB(
    'hsl(135, 30%, 30%)',
    'hsl(135, 45%, 15%)'),
  DIRT  : radiateFromXYAtoB(
    'hsl( 30, 60%, 40%)',
    'hsl( 30, 35%, 25%)'),
  SAND  : radiateFromXYAtoB(
    'hsl( 45, 70%, 75%)',
    'hsl( 35, 45%, 65%)'),
  STONE : radiateFromXYAtoB(
    'hsl(205, 20%, 40%)',
    'hsl(235, 35%, 25%)'),
  SEA   : radiateFromXYAtoB(
    'hsl(200, 50%, 20%)',
    'hsl(200, 55%, 30%)'),
}
