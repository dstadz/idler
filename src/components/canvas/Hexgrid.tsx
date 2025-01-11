import React, { useState } from 'react'
import Box from '@mui/material/Box'

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
    Array.from({ length: 10 }, (_, colIndex) => `${rowIndex}-${colIndex}`),
  )

  const hexWidth = 80
  const hexHeight = 80

  return (
    <Box
      sx={{
        border: '3px solid red',
        display: 'flex',
        position: 'absolute',
        top: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: `${hexHeight / 2}px`,
      }}
    >
      {hexCells.map((row, rowIndex) => {
        const isShifted = rowIndex % 2 === 1
        return (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginLeft: isShifted ? `${hexWidth / 2}px` : 0,
              marginTop: `-${hexHeight / 2}px`,
            }}
          >
            {row.map((_, colIndex) => {
              const id = `${rowIndex}-${colIndex}`
              const isActive = activeCells.has(id)
              return (
                <Box
                  key={id}
                  onClick={() => toggleCell(id)}
                  sx={{
                    width: hexWidth,
                    height: hexHeight,
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
                  {id}
                </Box>
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}
export default HexGrid
