'use client'
import React from 'react'
import Box from '@mui/material/Box'
import { Stack, Typography } from '@mui/material'
import { hexHeight, hexWidth, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import {
  selectedTileAtom,
  // selectedTilesAtom,
} from '@/atoms'
import BuildingNode from './BuildingNode'
import HexCellModal from './HexModal'

const hexagonPath = `polygon( 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`

const HexCell = ({
  cell,
  rowIndex,
  colIndex,
}: {
  cell: object
  rowIndex: number
  colIndex: number
  (): void
}) => {
  const {
    id,
    type,
    // level,
    building,
    // status,
  } = cell
  const [selectedTile, setSelectedTile] = useAtom(selectedTileAtom)
  // const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setSelectedTile(prev => prev.id === id ? {} : cell)
    console.log(`🚀 ~ handleClick ~ cell:`, cell)
  }

  return (
    <Stack sx={{ position: 'relative' }}>
      <Box
        key={cell.id}
        onClick={handleClick}
        sx={{
          width: hexWidth,
          height: hexHeight,
          position: 'relative',
          background:
            selectedTile.id === id ? 'red' :
            // selectedTilesAtom.includes(({ id }) => id === cell.id) ? 'green' :
            tileBackgrounds[type],
          clipPath: hexagonPath,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.3s ease',
          boxShadow: '0 0 0 2px black',
        }}
      >
        {building
          ? <BuildingNode building={building} />
          : <Typography> {`${rowIndex}, ${colIndex}`}</Typography>
        }

      </Box>
      {selectedTile.id === id && <HexCellModal cell={cell} modalType={'Admin'} />}
    </Stack>
  )
}

export default HexCell
