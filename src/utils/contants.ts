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
  STONE: { name: 'Stone', emoji: '🪨'},
  WOOD: { name: 'Wood', emoji: '🪵',},
  FOOD: { name: 'Food', emoji: '🍎',},
  GOLD: { name: 'Gold', emoji: '🪙'},
  POWER: { name: 'Power', emoji: '⚡️'},
  ENERGY: { name: 'Energy', emoji: '✨'},
  WATER: { name: 'water', emoji: '💧'},
}
