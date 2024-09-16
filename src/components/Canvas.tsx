import { CanvasElement } from '@/classes/canvas'
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
  units,
}) => {
  const canvasRef = useRef(null)
  const [elements, setElements] = useState([])
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
    const newElements = units.map(item => new CanvasElement({ ctx, ...item, }))
    setElements(newElements) // Update state with new elements

    let lastFrameTime = performance.now()
    let frameCount = 0
    let fpsTime = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.font = '48px serif'
      ctx.fillText('🏠', centralHubPosition.x, centralHubPosition.y)

      // Draw satellites (green circles)
      ctx.fillStyle = 'green'
      satellitePositions.forEach(pos => {
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)
        ctx.fill()
      })

      // Calculate the direction angle for the horse emoji
      const target = direction === 'toHub' ? centralHubPosition : satellitePositions[targetSatelliteIndex]
      const dx = target.x - resourceTransferPosition.x
      const dy = target.y - resourceTransferPosition.y
      const angle = Math.atan2(dy, dx) // Calculate the angle in radians

      // Determine if the horse should be flipped (moving right)
      const isMovingRight = dx > 0

      // Draw rotated horse emoji
      ctx.save() // Save the current canvas state
      ctx.translate(resourceTransferPosition.x, resourceTransferPosition.y) // Move the canvas origin to the horse position

      // Apply flipping if moving rightwards
      if (isMovingRight) {
        ctx.scale(-1, 1) // Flip the canvas horizontally
      }

      // ctx.rotate(angle) // Rotate the canvas by the angle of movement
      ctx.font = '30px serif' // Set the font size for the emoji
      ctx.fillText('🐎', -15, 10) // Adjust the position based on flip

      ctx.restore() // Restore the canvas to its original state

      // Display horse emoji coordinates
      ctx.fillStyle = 'black'
      ctx.font = '16px Arial'
      ctx.fillText(`Horse: (${Math.round(resourceTransferPosition.x)}, ${Math.round(resourceTransferPosition.y)})`, 10, 40)

      // Draw FPS counter
      ctx.fillText(`FPS: ${fpsRef.current}`, 10, 20)
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
      console.log(`🚀 ~ file: Canvas.tsx:165 ~ :`, {elements})
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
    //   elements.forEach(element => {
    //     console.log(`🚀 ~ file: Canvas.tsx:167 ~ gameLoop ~ element:`, element)
    //     element.updatePosition()
    //     element.drawUnit()
    // })
      requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)
  }, [])

  // Use `elements` as needed in rendering or other effects
  useEffect(() => {
    if (elements.length) {
      // Logic to draw elements on the canvas or interact with them
      const gameLoop = (timestamp) => {
        console.log(`🚀 ~ file: Canvas.tsx:165 ~ :`, {elements})
        elements.forEach(element => {
          console.log(`🚀 ~ file: Canvas.tsx:167 ~ gameLoop ~ element:`, element)
          element.updatePosition()
          element.drawUnit()
      })
        requestAnimationFrame(gameLoop)
      }

      requestAnimationFrame(gameLoop)
    }
  }, [elements]) // This effect runs whenever `elements` is updated

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
