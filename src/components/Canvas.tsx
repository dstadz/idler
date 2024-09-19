import { useRef, useEffect, useState } from 'react'
import { useCanvas, useHomeNode, useResourceNodes } from '@/hooks'

const Canvas = ({
  canvasRef,
  resourceNodesData,
  homeNode,
  drawHomeNode,
  setHomeResources,
}: {
  resourceNodesData: ResourceNodeType[]
}) => {
  const { ctx, clearWholeRect, drawFPS } = useCanvas(canvasRef)

  const { resourceNodes, drawResourceNodes } = useResourceNodes({
    ctx,
    homeNode,
    resourceNodesData,
    setHomeResources,
  })

  useEffect(() => {
    if (!resourceNodes.length) return
    const gameLoop = (timestamp: number) => {
      clearWholeRect(canvasRef.current)

      drawFPS(timestamp)
      drawHomeNode()
      drawResourceNodes()
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)
  }, [
    resourceNodes,
    clearWholeRect,
    canvasRef,
    drawFPS,
    drawHomeNode,
    drawResourceNodes,
  ])

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
