import React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

const NavStack = () => {
  const isSideMenu = true
  const sideBarWidth = 100 // useSelector(state => state.ui)
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  }
  const tabs = [
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
    {
      // icon: ,
      title: 'Village',
      route: 'village',
    },
    {
      // icon: ,
      title: 'Research',
      route: 'research',
    },
    {
      // icon: ,
      title: 'Map',
      route: 'map',
    },
    {
      // icon: ,
      title: 'Achievements',
      route: 'achievements',
    },{
      // icon: ,
      title: 'Resources',
      route: 'resources',
    },
    {
      // icon: ,
      title: 'Inventory',
      route: 'inventory',
    },

  ]
  return (
    <Box
    sx={{
      position: isSideMenu ? 'sticky' : 'unset',
      top: isSideMenu ? 0 : 'unset',
    }}
      className="border-2 border-green-500 w-32"
    >
      <div>NavStack</div>
      <Tabs
        value={value}
        onChange={handleChange}
        role="navigation"
        orientation="vertical"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.route}
            label={tab.title}
            value={index}
            sx={{
              minWidth: 64,
              minHeight: 60,
              borderRadius: '4px',
              transition: 'background 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default NavStack
