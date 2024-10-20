import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  } from 'react'

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [coords, setCoords] = useState<[number, number]>([0, 0])

  const handleClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {

    if (!ctx || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setCoords([x, y])
  }, [ctx])

  useEffect(() => () => setCtx(null), [])

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        setCtx(context)
      }
    }
  }, [canvasRef])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    setCtx(context)
  }, [canvasRef])

  const clearWholeRect = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [ctx])

  let fpsTime = 0
  let frameCount = 0
  const fpsRef = useRef(0)
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
    ctx.fillText(`FPS: ${fpsRef.current}`, 10, 20)
  }, [ctx])

  return {
    ctx,
    canvasRef,
    clearWholeRect,
    drawFPS,

    coords,
    handleClick,
  }
}
