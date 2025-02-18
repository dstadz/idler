import React from 'react'
import Box from '@mui/material/Box'
import { hexHeight, hexWidth } from '@/utils/constants'
import HexCell from './HexCell'

const HexRow = ({
  row,
  rowIndex,
}: {
  row: HexCell[]
  rowIndex: number
}) => {
  const isShifted = rowIndex % 2 === 1
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: isShifted ? `${hexWidth / 2}px` : 0,
        marginTop: `-${hexHeight / 4}px`,
      }}
    >
      {row.map((cell, colIndex) => <HexCell
        key={colIndex}
        cell={cell}
        rowIndex={rowIndex}
        colIndex={colIndex}
      />)}
    </Box>
  )
}

export default HexRow
