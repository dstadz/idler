import { ResourceRecord } from '@/types/node'
import {
  // Map as MapIcon,
} from '@mui/icons-material'

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
