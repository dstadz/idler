'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

const Canvas = ({ canvasWidth, canvasHeight }: { canvasWidth: number, canvasHeight: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx, clearWholeRect, drawFPS } = useCanvas({ canvasRef })

  const rafIdRef = useRef<number | null>(null)
  const gameLoop = useCallback(
    (timestamp: number) => {
      if (!ctx || !canvasRef.current) return

      clearWholeRect(canvasRef.current)
      drawFPS(timestamp)

      rafIdRef.current = requestAnimationFrame(gameLoop)
    },
    [ctx, canvasRef, clearWholeRect, drawFPS]
  )

  useEffect(() => {
    const canStart = ctx

    if (!canStart || rafIdRef.current) return
    rafIdRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (rafIdRef.current) {
        // cancelAnimationFrame(rafIdRef.current)
        console.log('Game loop stopped')
      }
      // rafIdRef.current = null
    }
  }, [ctx, gameLoop])


  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={styles.canvas}
    />
  )
}

export default Canvas

const styles = {
  canvas: {
    border: '3px solid yellow',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: 'none'
  }
}

const useCanvas = ({ canvasRef }:{ canvasRef: React.RefObject<HTMLCanvasElement> }) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [coords, setCoords] = useState<[number, number]>([0, 0])

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) setCtx(context)
    }
    return () => setCtx(null)
  }, [])


  const handleClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setCoords([x, y])
  }, [ctx])

  const clearWholeRect = useCallback((canvas: HTMLCanvasElement) => {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [ctx])
  const fpsRef = useRef(0)

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

  return {
    coords,
    clearWholeRect,
    drawFPS,
    handleClick
  }
}
