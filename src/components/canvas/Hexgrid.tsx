import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Stack, Typography } from '@mui/material'
import Button from '../UI/Button'
import { TILE_OBJECTS } from '@/utils/constants'
import { useAtom } from 'jotai'
import { mapTileMatrixAtom } from '@/atoms'

const hexWidth = 60
const hexHeight = hexWidth * (Math.sqrt(3)/2)

const HexGrid = () => {
  const [activeCells, setActiveCells] = useState(new Set())
  const [hexCells, setHexCells] = useAtom(mapTileMatrixAtom)
  const toggleCell = (id) => {
    setActiveCells((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

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
  const {
    id,
    type,
    level,
    buildingEmoji,
    status,
  } = cell
  console.log(`🚀 ~ file: Hexgrid.tsx:104 ~ cell:`, cell)
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
          // backgroundColor: isActive ? '#4caf50' : '#ccc',
          backgroundColor: TILE_OBJECTS[type]?.backgroundColor,
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
          {buildingEmoji}
        </Typography>
      </Box>
      {isActive && (
        <HexCellModal cell={cell} modalType={'Admin'}/>
      )}
    </Stack>
  )
}

const HexCellModal = ({ cell, modalType }: { cell: HexCell, modalType: string }) => {
  const {
    type,
    level,
    status,
  } = cell

  return (
    <Stack sx={{
      border: '3px solid red',
      background: 'white',
      position: 'absolute',
      top: -100,
    }}>
      <Stack>{modalType}</Stack>
      <Stack>{type} {level} {status}</Stack>

      {modalType === 'Admin' && <Stack flexDirection={'row'}>
        <Button onClick={() => console.log('Build')}>Build</Button>
      </Stack>}
      {modalType === 'user' && <Stack flexDirection={'row'}>
        <Button onClick={() => console.log('Build')}>Build</Button>
        <Button onClick={() => console.log('AD')}>AD for x2</Button>
      </Stack>}
    </Stack>
  )
}
