import React from 'react'
import Box from '@mui/material/Box'
import { hexHeight, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import { hexCellsAtom } from '@/atoms'
import HexRow from './HexRow'


const HexGrid = () => {
  const [hexCells] = useAtom(hexCellsAtom)

  if (!hexCells || hexCells.length < 2) return null

  return (
    <Box
      sx={{
        border: '3px solid yellow',
        display: 'flex',
        position: 'absolute',
        top: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: `${hexHeight / 4}px`,
        background: tileBackgrounds.SEA
      }}
    >
      {hexCells.map((row, rowIndex) => {
        const isShifted = rowIndex % 2 === 1
        return  (
          <HexRow
            key={rowIndex}
            row={row}
            isShifted={isShifted}
          />
        )
      })}
    </Box>
  )
}
export default HexGrid
