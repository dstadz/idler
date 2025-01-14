import React from 'react'
import Box from '@mui/material/Box'
import { Stack } from '@mui/material'
import { hexHeight, hexWidth, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import { hexCellsAtom } from '@/atoms'
import BuildingNode from './BuildingNode'
import HexCellModal from './HexModal'

const hexagonPath = `polygon( 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`

const HexCell = ({
  cell,
}: {
  cell: object
}) => {
  const {
    id,
    type,
    level,
    isActive,
    buildingId,
    status,
  } = cell
  if (buildingId)console.log(`🚀 ~ file: Hexgrid.tsx:83 ~ cell:`, cell)
  const [_, setHexCells] = useAtom(hexCellsAtom)



  return (
    <Stack sx={{ position: 'relative' }}>
      <Box
        key={cell.id}
        // onClick={clickCell}
        sx={{
          width: hexWidth,
          height: hexHeight,
          position: 'relative',
          background: tileBackgrounds[type],
          clipPath: hexagonPath,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.3s ease',
          boxShadow: '0 0 0 2px black',
        }}
      >
        {buildingId && <BuildingNode buildingId={buildingId} />}

      </Box>
      {isActive && <HexCellModal cell={cell} modalType={'Admin'} />}
    </Stack>
  )
}

export default HexCell
