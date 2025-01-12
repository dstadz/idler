'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHomeNode, usePlanetNodes } from '@/hooks'
import Box from '@mui/material/Box'
import HexGrid from './Hexgrid'


const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [coords, setCoords] = useState<[number, number]>([0, 0])
  const fpsRef = useRef(0)

  const handleClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setCoords([x, y])
  }, [ctx])

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) setCtx(context)
    }
    return () => setCtx(null)
  }, [])

  const clearWholeRect = useCallback((canvas: HTMLCanvasElement) => {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [ctx])

  let lastFrameTime = performance.now()
  let frameCount = 0
  let fpsTime = 0

  const drawFPS = useCallback((timestamp: number) => {
    if (!ctx) return
    const deltaTime = timestamp - lastFrameTime
    lastFrameTime = timestamp
    frameCount++
    fpsTime += deltaTime

    if (fpsTime >= 1000) {
      fpsRef.current = frameCount
      frameCount = 0
      fpsTime = 0
    }

    ctx.fillText(`FPS: ${fpsRef.current}`, 10, 20)
  }, [ctx])

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
