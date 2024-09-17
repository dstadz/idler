import { useRef, useEffect, useState, useCallback } from 'react'

export const useCanvas = (canvasRef) => {

  // initialize context
  const [ctx, setCtx] = useState(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      setCtx(context)
    }
  }, [canvasRef])

  const clearWholeRect = useCallback(canvas => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [ctx])


  const fpsRef = useRef(0)
  let lastFrameTime = performance.now()
  let frameCount = 0
  let fpsTime = 0
  const drawFPS = useCallback(timestamp => {
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
    clearWholeRect,
    drawFPS,
  }
}
