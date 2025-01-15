import React from 'react'
import Box from '@mui/material/Box'
import { hexHeight, hexWidth } from '@/utils/constants'
import HexCell from './HexCell'
// const styles = {

// }
const HexRow = ({
  row,
  rowIndex,
  isShifted,
  clickCell,
}: {
  row: HexCell[]
  rowIndex: number
  isShifted: boolean
  clickCell(): void
}) => (
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
      clickCell={clickCell}
    />)}
  </Box>
)

export default HexRow
