import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Stack, Typography } from '@mui/material'

const hexWidth = 60
const hexHeight = hexWidth * (Math.sqrt(3)/2)
const getCoods = (row, col) => `${row}-${col}`

const HexGrid = () => {
  const [activeCells, setActiveCells] = useState(new Set())

  const toggleCell = (id) => {
    setActiveCells((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const hexCells = Array.from({ length: 10 }, (_, rowIndex) =>
    Array.from({ length: 9 }, (_, colIndex) => ({ id: getCoods(rowIndex, colIndex) })),
  )

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
      }}
    >
      {hexCells.map((row, rowIndex) => {
        const isShifted = rowIndex % 2 === 1
        return  (
          <HexRow
            key={rowIndex}
            row={row}
            isShifted={isShifted}
            activeCells={activeCells}
            toggleCell={toggleCell}
          />
        )
      })}
    </Box>
  )
}
export default HexGrid

const HexRow = ({
  row,
  rowIndex,
  isShifted,
  activeCells,
  toggleCell,
}: {
  row: HexCell[]
  rowIndex: number
  isShifted: boolean
  activeCells: Set<string>
  toggleCell: (id: string) => void
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
      toggleCell={toggleCell}
      activeCells={activeCells}
      rowIndex={rowIndex}
      colIndex={colIndex}
    />)}
  </Box>
)

const HexCell = ({
  cell,
  // rowIndex,
  // colIndex,
  activeCells,
  toggleCell,
}: {
  cell: object
  rowIndex: number
  colIndex: number
  activeCells: Set<string>
  toggleCell: (id: string) => void
}) => {
  const { id } = cell
  const isActive = activeCells.has(id)
  return (
    <Stack sx={{ position: 'relative' }}>
      <Box
        key={cell.id}
        onClick={() => toggleCell(id)}
        sx={{
          width: hexWidth,
          height: hexHeight,
          position: 'relative',
          backgroundColor: isActive ? '#4caf50' : '#ccc',
          clipPath: `polygon(
            50% 0%,
            100% 25%,
            100% 75%,
            50% 100%,
            0% 75%,
            0% 25%
          )`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.3s ease',
          boxShadow: '0 0 0 2px black',
        }}
      >
        <Typography
          sx={{
            // background: 'red',
          }}
        >
          {id}
        </Typography>
      </Box>
      {isActive && (
        <Stack sx={{
          border: '3px solid red',
          background: 'white',
          position: 'absolute',
          top: -hexWidth/2,
        }}>
          Hello
        </Stack>
      )}
    </Stack>
  )
}
