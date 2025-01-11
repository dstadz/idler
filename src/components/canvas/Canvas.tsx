'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useCanvas, useHomeNode, usePlanetNodes } from '@/hooks'
import Box from '@mui/material/Box'
import HexGrid from './Hexgrid'


const Canvas = () => {
  const { ctx, canvasRef, drawFPS, clearWholeRect, handleClick } = useCanvas()
  const { homeNode, drawHomeNode } = useHomeNode(ctx)
  const { planets, drawPlanets } = usePlanetNodes({ ctx, homeNode })
  const rafIdRef = useRef<number | null>(null)

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
    <div style={{ border: '3px solid #0ff'}}>
      <HexGrid/>
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border-2 border-purple-500 rounded"
      onClick={handleClick}
    />

    </div>
  )
}

export default Canvas
