import { useRef, useEffect, useState } from 'react'

const useCentralHub = ({
  // ctx: CanvasRenderingContext2D
}) => {
  const centralHubPosition = { x: 300, y: 200 }
  const satellitePositions = [{ x: 50, y: 50 }, { x: 200, y: 100 }]
  let resourceTransferPosition = { x: 50, y: 50 }
  let direction = 'toHub'
  let targetSatelliteIndex = 0

  const speed = 2 // Speed of movement


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

const Canvas = () => {
  const canvasRef = useRef(null)
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
    let lastFrameTime = performance.now()
    let frameCount = 0
    let fpsTime = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw central hub (blue rectangle)
      ctx.font = '48px serif'
      ctx.fillText('🏠', centralHubPosition.x, centralHubPosition.y)

      // Draw satellites (green circles)
      ctx.fillStyle = 'green'
      satellitePositions.forEach(pos => {
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)
        ctx.fill()
      })

      // Draw resource transfer div (horse emoji)
ctx.font = '30px serif'
ctx.fillText('🐴', resourceTransferPosition.x, resourceTransferPosition.y)

// Display horse emoji coordinates
ctx.fillStyle = 'black'
ctx.font = '16px Arial'
ctx.fillText(`Horse: (${Math.round(resourceTransferPosition.x)}, ${Math.round(resourceTransferPosition.y)})`, 10, 80)

ctx.fillText(`fakeFPS: ${fpsRef.current}`, 10, 20)
    }

    const updatePosition = () => {
      const targetSatellite = satellitePositions[targetSatelliteIndex]

      if (direction === 'toHub') {
        const dx = centralHubPosition.x - resourceTransferPosition.x
        const dy = centralHubPosition.y - resourceTransferPosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < speed) {
          direction = 'toSatellite'
        } else {
          resourceTransferPosition = {
            x: resourceTransferPosition.x + (dx / distance) * speed,
            y: resourceTransferPosition.y + (dy / distance) * speed,
          }
        }
      } else if (direction === 'toSatellite') {
        const dx = targetSatellite.x - resourceTransferPosition.x
        const dy = targetSatellite.y - resourceTransferPosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < speed) {
          direction = 'toHub'
          targetSatelliteIndex = (targetSatelliteIndex + 1) % satellitePositions.length
        } else {
          resourceTransferPosition = {
            x: resourceTransferPosition.x + (dx / distance) * speed,
            y: resourceTransferPosition.y + (dy / distance) * speed,
          }
        }
      }
    }

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
  return <canvas
    ref={canvasRef}
    width={800}
    height={600}
    className="border-2 border-purple-500 border-rounded"
  />
}

export default Canvas
