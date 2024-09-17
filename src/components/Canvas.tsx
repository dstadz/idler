import { ResourceNode } from '@/classes/canvas'
import { useRef, useEffect, useState } from 'react'

const Canvas = ({
  homeNode,
  resourceNodesData,
}) => {
  const canvasRef = useRef(null)
  const [resourceNodes, setResourceNodes] = useState([])
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const newResourceNodes = [homeNode, ...resourceNodesData].map(item => new ResourceNode({
      ctx,
      ...item,
      homeNode,
    }))
    setResourceNodes(newResourceNodes)
  }, [resourceNodesData])

  const fpsRef = useRef(0)
  let lastFrameTime = performance.now()
  let frameCount = 0
  let fpsTime = 0
  const drawFPS = (ctx, timestamp) => {
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

  const clearRect = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  useEffect(() => {

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (resourceNodes.length) {
      const gameLoop = (timestamp) => {
        drawFPS(ctx, timestamp)

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

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let lastFrameTime = performance.now()
    let frameCount = 0
    let fpsTime = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw FPS counter
      ctx.fillText(`FPS: ${fpsRef.current}`, 10, 20)
    }

    const updatePosition = () => {}

    const gameLoop = (timestamp) => {
      updatePosition()
      draw()
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)
  }, [])

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
