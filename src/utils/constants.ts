import { ResourceRecord } from '@/types/node'
import {
  Map as MapIcon,
} from '@mui/icons-material'

export const NAV_TABS = [
  {
    // icon: <LocalOffer />,
    title: 'Civvies',
    route: 'civvies',
    // matchPath: '/app/purchases/:id*',
    // treatmentKeys: ['app-route-purchases'],
  },
  {
    // icon: <LocalOffer />,
    title: 'Player',
    route: 'player',
    // matchPath: '/app/purchases/:id*',
    // treatmentKeys: ['app-route-purchases'],
  },
  // {
  //   icon: ,
  //   title: 'Village',
  //   route: 'village',
  // },
  // {
  //   // icon: ,
  //   title: 'Research',
  //   route: 'research',
  // },
  {
    icon: MapIcon,
    title: 'Overworld',
    route: 'overworld',
  },
  // {
  //   // icon: ,
  //   title: 'Achievements',
  //   route: 'achievements',
  // },{
  //   // icon: ,
  //   title: 'Resources',
  //   route: 'resources',
  // },
  // {
  //   // icon: ,
  //   title: 'Inventory',
  //   route: 'inventory',
  // },
]

export const RESOURCES = {
  STONE: { NAME: 'Stone', EMOJI: '🪨'},
  WOOD: { NAME: 'Wood', EMOJI: '🪵',},
  FOOD: { NAME: 'Food', EMOJI: '🍎',},
  GOLD: { NAME: 'Gold', EMOJI: '🪙'},
  POWER: { NAME: 'Power', EMOJI: '⚡️'},
  ENERGY: { NAME: 'Energy', EMOJI: '✨'},
  WATER: { NAME: 'Water', EMOJI: '💧'},
}

export const RESOURCES_KEYS = Object.keys(RESOURCES) as (keyof typeof RESOURCES)[]

export const getResourceList = ({
  resourceObject = getDefaultResources(),
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


// Utility function to provide default resources
export const getDefaultResources = (): ResourceRecord => ({
  STONE: 0,
  WOOD: 0,
  FOOD: 0,
  GOLD: 0,
  POWER: 0,
  ENERGY: 0,
  WATER: 0,
})
