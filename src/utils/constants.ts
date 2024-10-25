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

export const ITEMS = {
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
  BATTERY: {
    NAME: 'Battery',
    UNLOCK_COST: 50000,
    SELL_PRICE: 70000,
    TIME_TO_MAKE: 240,
    COST: [[ALLOYS.COPPER, 10]], // , [ITEMS.WIRE, 2]],
  },
  GLASS: {
    NAME: 'Glass',
    UNLOCK_COST: 200000,
    SELL_PRICE: 220000,
    TIME_TO_MAKE: 720,
    COST: [[ALLOYS.SILICON, 10]],
  },
  CIRCIUT: {
    NAME: 'Circuit',
    UNLOCK_COST: 400000,
    SELL_PRICE: 620000,
    TIME_TO_MAKE: 960,
    COST: [
      [ALLOYS.SILICON, 10],
      [ALLOYS.IRON, 10], // ALUMINUM
      // [ITEMS.WIRE, 10]
    ],
  },
}

export const PLANETS = [
  {
    planetName: 'Balor',
    emoji: '🪐',
    basePrice: 100,
    telescopeNumber: 'Default',
    levels: {
      mineRate: 1,
      speed: 1,
      cargo: 1,
    },
    resources: {
      [ORES.COPPER.NAME]: 50,
      // [ORES.IRON.NAME]: 50,
    },
    yields: {
      [ORES.COPPER.NAME]: 50,
      [ORES.IRON.NAME]: 50,
    },
    position: [100, 400],
  },
  {
    planetName: 'Drasta',
    emoji: '🌼',
    basePrice: 200,
    telescopeNumber: 'Default',
    levels: {
      mineRate: 1,
      speed: 1,
      cargo: 1,
    },
    resources: {
      [ORES.IRON.NAME]: 50,
      // [ORES.SILICA.NAME]: 50,
    },
    yields: {
      [ORES.IRON.NAME]: 50,
      [ORES.SILICA.NAME]: 50,
    },
    position: [400, 400],
  },
  // {
  //   planetName: 'Anadius',
  //   basePrice: 500,
  //   telescopeNumber: 'Default',
  //   resources: {
  //     Iron: 50
  //   },
  //   yields: {
  //   distance: 14
  // },
  // {
  //   planetName: 'Dholen',
  //   basePrice: 1250,
  //   telescopeNumber: 'Default',
  //   resources: {
  //     Iron: 80,
  //     Lead: 20
  //   },
  //   distance: 15
  // },
  // {
  //   planetName: 'Verr',
  //   basePrice: 5000,
  //   telescopeNumber: 1,
  //   resources: {
  //     Lead: {
  //     Iron: 30,
  //     Copper: 20
  //   },
  //   distance: 16
  // },
  // {
  //   planetName: 'Newton',
  //   basePrice: 9000,
  //   telescopeNumber: 1,
  //   resources: {
  //     Lead: 100
  //   },
  //   distance: 18
  // },
  // {
  //   planetName: 'Widow',
  //   basePrice: 15000,
  //   telescopeNumber: 1,
  //   resources: {
  //     Iron: 40,
  //     Copper: 40,
  //     Silica: 20
  //   },
  //   distance: 20
  // }
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
