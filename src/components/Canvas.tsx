import { useRef, useEffect, useState } from 'react'
import { Node, ResourceNode } from '@/classes'
import { useCanvas } from '@/hooks'

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

  const [homeNode, setHomeNode] = useState({} as NodeType)
  useEffect(() => {
    if (!ctx || !homeNodeData) return

    const newHomeNode = new Node(
      { ctx, ...homeNodeData, id: `${Math.random()}` },
    )
    setHomeNode(newHomeNode)
  }, [ctx, homeNodeData])

  const [resourceNodes, setResourceNodes] = useState({} as ResourceNodeType[])
  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes = resourceNodesData
    .map(node => new ResourceNode(
      { ctx, ...node, homeNode, id: `${Math.random()}` }
    ))
    setResourceNodes(newResourceNodes)
  }, [ctx, homeNode, resourceNodesData])

  useEffect(() => {
    if (!resourceNodes.length) return

    const gameLoop = (timestamp: number) => {
      clearWholeRect(canvasRef.current)
      drawFPS(timestamp)

      homeNode.drawUnit()
      resourceNodes.forEach(node => {
        node?.transportNode?.updatePosition()
        node?.drawUnit()
      })
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)
  }, [homeNode, resourceNodes, drawFPS, clearWholeRect])

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
