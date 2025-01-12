'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { useCanvas, useHomeNode, usePlanetNodes } from '@/hooks'
import Box from '@mui/material/Box'
import HexGrid from './Hexgrid'


const Canvas = () => {
  const { ctx, canvasRef, drawFPS, clearWholeRect, handleClick } = useCanvas()
  const { homeNode, drawHomeNode } = useHomeNode(ctx)
  const { planets, drawPlanets, setPlanetsPosition } = usePlanetNodes({ ctx, homeNode })
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    setPlanetsPosition(planets)
  }, [planets])

  const gameLoop = useCallback(
    (timestamp: number) => {
      if (!ctx || !canvasRef.current) return

      clearWholeRect(canvasRef.current)
      drawFPS(timestamp)
      drawHomeNode()
      drawPlanets()

      rafIdRef.current = requestAnimationFrame(gameLoop)
    },
    [ctx, canvasRef, clearWholeRect, drawFPS, drawHomeNode, drawPlanets]
  )

  useEffect(() => {
    const canStart = ctx && homeNode && planets.length > 0

    if (!canStart || rafIdRef.current) return
    rafIdRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (rafIdRef.current) {
        // cancelAnimationFrame(rafIdRef.current)
        console.log('Game loop stopped')
      }
      // rafIdRef.current = null
    }
  }, [ctx, homeNode, planets, gameLoop])

  return (
    <Box sx={{
      position: 'relative',
      border: '3px solid #0ff',
      // width: '800px',
      // height: 'unset',
      }}>
        <HexGrid />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          // position: 'absolute',
          // top: 0,
          // left: 0,
          zIndex: 1,
          border: '3px solid red',
          pointerEvents: 'none'
        }}
      />
    </Box>
  )
}

export default Canvas
