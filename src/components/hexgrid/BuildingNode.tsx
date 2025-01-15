import React from 'react'
import Box from '@mui/material/Box'
import { BUILDING_OBJECTS, hexHeight, hexWidth, tileBackgrounds } from '@/utils/constants'
import { Typography } from '@mui/material'

const BuildingNode = ({ building }: { building: any }) => {
const {
  level,
  status,
  type,
} = building


  const buildingEmoji = BUILDING_OBJECTS?.[type].level[level].icon ||'x'
  return (
    <Box
      sx={{
        // width: hexWidth,
        // height: hexHeight,
        // position: 'absolute',
        background: 'magenta', // tileBackgrounds.SEA,
        // cursor: 'pointer',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // transition: 'background-color 0.3s ease',
        // boxShadow: '0 0 0 2px black',
      }}
    >
      <Typography sx={{ fontSize: '2rem' }} >
        {buildingEmoji || 'home'}
      </Typography>
    </Box>
  )
}

export default BuildingNode
