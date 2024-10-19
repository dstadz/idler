'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { useCanvas } from '@/hooks'

const Canvas = ({ drawNodes, nodes, }) => {
  const { ctx, canvasRef, drawFPS, clearWholeRect, handleClick } = useCanvas()

  const rafIdRef = useRef<number | null>(null)
  const gameLoop = useCallback((timestamp: number) => {
    if (!canvasRef.current) return

    clearWholeRect(canvasRef.current)
    drawFPS(timestamp)

    drawNodes.forEach(draw => draw())
    rafIdRef.current = requestAnimationFrame(gameLoop)
  }, [
    canvasRef,
    clearWholeRect,
    drawFPS,
    drawNodes,
  ])

  useEffect(() => {
    if (nodes.length === 0 || !rafIdRef.current ) return

    rafIdRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop, nodes])

  return <canvas
    ref={canvasRef}
    width={800}
    height={600}
    className="border-2 border-purple-500 border-rounded"
    onClick={handleClick}
  />
}

export default Canvas
