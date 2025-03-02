import { useCallback, useEffect, useRef, useState } from 'react'
import { Unit } from './Unit'

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafIdRef = useRef<number | null>(null)

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [coords, setCoords] = useState<[number, number]>([0, 0])

  // set up canvas
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) setCtx(context)
    }
    return () => setCtx(null)
  }, [])



  //
  // CANVAS SUPPORT FUNCTIONS
  // FPS counter
  const fpsRef = useRef(0)
  let [frameCount, fpsTime] = [0, 0]
  let lastFrameTime = performance.now()
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


  const clearWholeRect = useCallback((canvas: HTMLCanvasElement) => {
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [ctx])

  const handleClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setCoords([x, y])
  }, [ctx])

  return {
    canvasRef,
    rafIdRef,
    ctx,
    coords,
    clearWholeRect,
    drawFPS,
    handleClick,
  }
}
