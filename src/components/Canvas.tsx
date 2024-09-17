import { ResourceNode } from '@/classes/canvas'
import { useRef, useEffect, useState } from 'react'

const useCanvasContext = (canvasRef) => {
  const [ctx, setCtx] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      setCtx(context)
    }
  }, [canvasRef])

  return { ctx }
}


const Canvas = ({
  homeNode,
  resourceNodesData,
}) => {
  const canvasRef = useRef(null)
  const { ctx } = useCanvasContext(canvasRef)
  const fpsRef = useRef(0)
  let lastFrameTime = performance.now()
  let frameCount = 0
  let fpsTime = 0
  const drawFPS = timestamp => {
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
  }

  const clearRect = canvas => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const [resourceNodes, setResourceNodes] = useState([])
  useEffect(() => {
    const canvas = canvasRef.current
    const newResourceNodes = [homeNode, ...resourceNodesData]
    .map(item => new ResourceNode({
      ctx,
      ...item,
      homeNode,
    }))
    setResourceNodes(newResourceNodes)
  }, [resourceNodesData])

  useEffect(() => {
    const canvas = canvasRef.current

    if (resourceNodes.length) {
      const gameLoop = (timestamp) => {
        clearRect(canvas)
        drawFPS(timestamp)

        resourceNodes.forEach(node => {
          node?.transportNode?.updatePosition()
          node?.transportNode?.drawUnit()
          node?.drawUnit()
      })
        requestAnimationFrame(gameLoop)
      }
      requestAnimationFrame(gameLoop)
    }
  }, [resourceNodes])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border-2 border-purple-500 border-rounded"
    />
  )
}

export default Canvas
