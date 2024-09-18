import { useRef, useEffect, useState } from 'react'
import { Node, ResourceNode } from '@/classes'
import { useCanvas } from '@/hooks'

export const useResourceNodes = ({
  canvasRef,
  homeNode,
  resourceNodesData,
}) => {


  const { ctx, clearWholeRect, drawFPS } = useCanvas(canvasRef)
  const [resourceNodes, setResourceNodes] = useState({} as ResourceNodeType[])
  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes = resourceNodesData
    .map(node => new ResourceNode(
      { ctx, ...node, homeNode, id: `${Math.random()}` }
    ))
    setResourceNodes(newResourceNodes)
  }, [ctx, homeNode, resourceNodesData])

  return {
    resourceNodes, setResourceNodes
  }
}
