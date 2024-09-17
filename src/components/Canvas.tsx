import { ResourceNode } from '@/classes'
import { useCanvas } from '@/hooks'
import { useRef, useEffect, useState, useCallback } from 'react'

const Canvas = ({
  homeNode,
  resourceNodesData,
}) => {
  const canvasRef = useRef(null)
  const { ctx, clearWholeRect, drawFPS } = useCanvas(canvasRef)

  const [resourceNodes, setResourceNodes] = useState([])
  useEffect(() => {
    if (!ctx) return
    const canvas = canvasRef.current
    const newResourceNodes = [homeNode, ...resourceNodesData]
      .map(node => new ResourceNode({
        ctx,
        ...node,
        homeNode,
      }))
    setResourceNodes(newResourceNodes)

  }, [ctx, homeNode, resourceNodesData])

  useEffect(() => {
    if (!resourceNodes.length) return

    const canvas = canvasRef.current
    const gameLoop = (timestamp) => {
      clearWholeRect(canvas)
      drawFPS(timestamp)

      resourceNodes.forEach(node => {
        node?.transportNode?.updatePosition()
        node?.transportNode?.drawUnit()
        node?.drawUnit()
      })
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)
  }, [resourceNodes, drawFPS, clearWholeRect])

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
