import { useRef, useEffect, useState } from 'react'
import { Node, ResourceNode } from '@/classes'
import { useCanvas, useHomeNode, useResourceNodes } from '@/hooks'

const Canvas = ({
  homeNodeData,
  resourceNodesData,
  updateResourceValues,
}: {
  homeNodeData: NodeType
  resourceNodesData: ResourceNodeType[]
  updateResourceValues: ({
    updatedNodes,
    updatedHomeNode,
  }: {
    updatedNodes: ResourceNodeType[]
    updatedHomeNode: NodeType
  }) => void
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx, clearWholeRect, drawFPS } = useCanvas(canvasRef)

  const { homeNode, drawHomeNode } = useHomeNode({
    ctx,
    homeNodeData,
  })

  const { resourceNodes, drawResourceNodes } = useResourceNodes({
    ctx,
    homeNode,
    resourceNodesData,
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
  }, [drawHomeNode, resourceNodes, drawResourceNodes, drawFPS, clearWholeRect])

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
