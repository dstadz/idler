import { ResourceNode } from '@/classes/canvas'
import { useRef, useEffect, useState } from 'react'

const useCentralHub = ({
  // ctx: CanvasRenderingContext2D
}) => {
  const centralHubPosition = { x: 300, y: 200 }
  const satellitePositions = [{ x: 50, y: 50 }, { x: 200, y: 100 }]
  let resourceTransferPosition = { x: 50, y: 50 }
  let direction = 'toHub'
  let targetSatelliteIndex = 0

  const speed = 0.2 // Speed of movement


  // const getValues = () => {
    return {
      centralHubPosition,
      satellitePositions,
      resourceTransferPosition,
      direction,
      targetSatelliteIndex,
      speed,
    }
  }


const Canvas = ({
  homeNode,
  resourceNodesData,
}) => {
  const canvasRef = useRef(null)
  const [resourceNodes, setResourceNodes] = useState([])
  const fpsRef = useRef(0) // Use ref to track FPS directly
  let {
    centralHubPosition,
    satellitePositions,
    resourceTransferPosition,
    direction,
    targetSatelliteIndex,
    speed
  } = useCentralHub({})

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

  useEffect(() => {
    if (resourceNodes.length) {
      const gameLoop = (timestamp) => {
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
      const deltaTime = timestamp - lastFrameTime
      lastFrameTime = timestamp

      frameCount++
      fpsTime += deltaTime

      if (fpsTime >= 1000) {
        fpsRef.current = frameCount
        frameCount = 0
        fpsTime = 0
      }

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
