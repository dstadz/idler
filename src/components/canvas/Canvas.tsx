'use client'
import { useCanvas } from './useCanvas'
import { useUnits } from '@/hooks/nodes/useUnits'
import React, { useCallback, useEffect } from 'react'

const Canvas = ({ canvasWidth, canvasHeight }: { canvasWidth: number, canvasHeight: number }) => {
  const { ctx, canvasRef, rafIdRef, clearWholeRect, drawFPS } = useCanvas()
  const { drawUnits } = useUnits({ ctx })


    // GAME LOOP
  const canvasLoop = useCallback((timestamp: number) => {
    if (!ctx || !canvasRef.current) return
    clearWholeRect(canvasRef.current)
    drawFPS(timestamp)

    drawUnits(ctx)

    rafIdRef.current = requestAnimationFrame(canvasLoop)
  }, [ctx, canvasRef, clearWholeRect, drawFPS])

  useEffect(() => {
    if (!ctx || rafIdRef.current) return
    rafIdRef.current = requestAnimationFrame(canvasLoop)
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        console.log('Game loop stopped')
      }
      rafIdRef.current = null
    }
  }, [ctx])

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
