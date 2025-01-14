import React from 'react'
import Box from '@mui/material/Box'
import { hexHeight, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import { hexCellsAtom } from '@/atoms'
import HexRow from './HexRow'


const HexGrid = ({ clickCell }: { clickCell(): void }) => {
  const [hexCells] = useAtom(hexCellsAtom)

  if (!hexCells || hexCells.length < 2) return null

  return (
    <Box
      sx={{
        border: '3px solid yellow',
        display: 'flex',

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
            rowIndex={rowIndex}
            clickCell={clickCell}
          />
        )
      })}
    </Box>
  )
}
export default HexGrid
