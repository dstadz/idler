import React, { useState } from 'react'
import Box from '@mui/material/Box'

const HexGrid = ({ rows = 5, cols = 5 }) => {
  const [activeCells, setActiveCells] = useState(new Set())

  const toggleCell = (id) => {
    setActiveCells((prev) => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }
  const hexCells = [
    [{ },{ },{ }],
    [  { },{ },{ }],
    [{ },{ },{ }],
  ]
  const hexWidth = 80
  const hexHeight = 80 // Math.sqrt(3) / 2 * hexWidth


  return (
    <Box
      sx={{
        // position: 'relative',
        border: '3px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: cols * 60 * 0.75 + 30,
        // height: rows * (Math.sqrt(3) / 2 * 60) + (60 / 2),
        margin: '0 auto'
      }}
    >
      {hexCells.map((row, rowIndex) => {
        const isShifted = rowIndex % 2 === 1
        return (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              border: '3px solid green',
              justifyContent: 'center',
              marginLeft: isShifted ? `${hexWidth}px` : 0,
              marginTop: `-${hexHeight / 2}px`,
            }}>
            {row.map((_, colIndex) => {
              const id = `${rowIndex}-${colIndex}`
              const isActive = activeCells.has(id)
              return (
                <Box

                key={`${rowIndex}-${colIndex}`}
                onClick={() => toggleCell(id)}
                sx={{
                    width: hexWidth,
                    height: hexHeight,
                    border: '3px solid orange',
                    backgroundColor: isActive ? '#4caf50' : '#ccc',
                    clipPath: `polygon(
                    50% 0%,
                    100% 25%,
                    100% 75%,
                    50% 100%,
                    0% 75%,
                    0% 25%)`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.3s ease'
                  }}>
                  {rowIndex}, {colIndex}
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
