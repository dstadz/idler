import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { Stack, Typography } from '@mui/material'
import Button from '../UI/Button'
import { hexHeight, hexWidth, TILE_OBJECTS, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import { mapTileMatrixAtom } from '@/atoms'


const hexagonPath = `polygon( 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`
const HexGrid = () => {
  const [hexCells, setHexCells] = useAtom(mapTileMatrixAtom)

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

const HexRow = ({
  row,
  rowIndex,
  isShifted,
}: {
  row: HexCell[]
  rowIndex: number
  isShifted: boolean
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
    />)}
  </Box>
)

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
    buildingEmoji,
    status,
  } = cell
  console.log(`🚀 ~ file: Hexgrid.tsx:104 ~ cell:`, cell)


  const [hexCells, setHexCells] = useAtom(mapTileMatrixAtom)


  const toggleCell = (id: number) => {
    const [rowIndex, colIndex] = id.split('-').map(Number)
    setHexCells(prev =>
      prev.map((row, rIdx) =>
        rIdx !== rowIndex ? row : row.map((cell, cIdx) =>
          cIdx !== colIndex ? cell : { ...cell, isActive: !cell.isActive }
        )
      )
    )
  }

  return (
    <Stack sx={{ position: 'relative' }}>
      <Box
        key={cell.id}
        onClick={() => toggleCell(id)}
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
        <Typography
          sx={{ fontSize: '2rem' }} >
          {buildingEmoji}
        </Typography>
      </Box>
      {isActive && <HexCellModal cell={cell} modalType={'Admin'} />}
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
