'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { useCanvas, useHomeNode, usePlanetNodes } from '@/hooks'

const Canvas = () => {
  const { ctx, canvasRef, drawFPS, clearWholeRect, handleClick } = useCanvas()
  const { homeNode, drawHomeNode } = useHomeNode(ctx)
  const { planets, drawPlanets } = usePlanetNodes({ctx, homeNode})

  const rafIdRef = useRef<number | null>(null)
  const gameLoop = useCallback((timestamp: number) => {
    if (!canvasRef.current) return

    clearWholeRect(canvasRef.current)
    drawFPS(timestamp)

    drawHomeNode()
    drawPlanets()
    rafIdRef.current = requestAnimationFrame(gameLoop)
  }, [
    canvasRef,
    clearWholeRect,
    drawFPS,
    drawHomeNode,
    drawPlanets,
  ])

  useEffect(() => {
    if (
      !homeNode ||
      Object.keys(homeNode).length === 0 ||
      planets.length === 0 ||
      rafIdRef.current
    ) return

    rafIdRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop, planets, homeNode])

  return <canvas
    ref={canvasRef}
    width={800}
    height={600}
    className="border-2 border-purple-500 border-rounded"
    onClick={handleClick}
  />
}

export default Canvas
