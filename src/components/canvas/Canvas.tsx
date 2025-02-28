'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const Canvas = ({ canvasWidth, canvasHeight }: { canvasWidth: number, canvasHeight: number }) => {
  const { ctx, canvasRef, clearWholeRect, drawFPS } = useCanvas()

  const addToMainResources = (resource: keyof ResourceRecord, amount: number) =>
    setMainResources(prev => ({
      ...prev,
      [resource]: (prev[resource] || 0) + amount,
    }))
  const units = [
    {
      id: 'unit1',
      ctx,
      size: 60,
      emoji: "🦁",
      position: [100, 100],
      homeNode: { position: [500, 500] },
      parentNode: { position: [300, 500] },
      levels: { speed: 1, cargo: 1, dexterity: 1 },
      addToMainResources,
    },
  ].map(unit => new Unit(unit))

  const drawUnits = (ctx) => {
    if (!ctx) return

    units.forEach(unit => unit.drawUnit(ctx))
    console.log(`🚀 ~ drawUnits ~ units:`, units)
  }


  const rafIdRef = useRef<number | null>(null)
  const gameLoop = useCallback(
    (timestamp: number) => {
      if (!ctx || !canvasRef.current) return
      clearWholeRect(canvasRef.current)
      drawFPS(timestamp)

      drawUnits(ctx)

      rafIdRef.current = requestAnimationFrame(gameLoop)
    },
    [ctx, canvasRef, clearWholeRect, drawFPS]
  )

  useEffect(() => {


    if (!ctx || rafIdRef.current) return

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

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

    ctx.fillText(`FPS: ${fpsRef.current}`, 100, 100)
  }, [ctx])

  return {
    canvasRef,
    ctx,
    coords,
    clearWholeRect,
    drawFPS,
    handleClick
  }
}

export class Unit {
  id: string
  position: [number, number]
  // resources: ResourceRecord
  emoji: string
  size: number
  centerDrawPoint: () => [number, number]

  constructor({
    id,
    position,
    emoji = '❌',
    size = 10,
    }: NodeTypeData) {
    this.id = id
    this.position = position
    this.emoji = emoji
    this.size = size
    this.centerDrawPoint = () => [
      this.position[0] - size / 2,
      this.position[1] + size / 2,
    ]
  }

  drawUnit(ctx: CanvasRenderingContext2D) {
    ctx.font = `${this.size}px serif`
    ctx.fillText(this.emoji, ...this.centerDrawPoint())
    ctx.font = '16px serif'

  }

}
