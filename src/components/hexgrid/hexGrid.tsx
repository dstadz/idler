'use client'
import React from 'react'
import { Stack } from '@mui/material'
import { hexHeight, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import { hexCellsAtom } from '@/atoms'
import HexRow from './HexRow'


const HexGrid = () => {
  const [hexCells] = useAtom(hexCellsAtom)

  if (!hexCells || hexCells.length < 2) return null

  return (
    <Stack
      className='hex-grid'
      component={'section'}
      direction={'column'}
      sx={{
        border: '3px solid blue',
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

          />
        )
      })}
    </Stack>
  )
}
export default HexGrid
