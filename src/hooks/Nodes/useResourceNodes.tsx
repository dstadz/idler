import { useRef, useEffect, useState } from 'react'
import { Node, ResourceNode } from '@/classes'

export const useResourceNodes = ({
  ctx,
  homeNode,
  resourceNodesData,
}) => {
  const [resourceNodes, setResourceNodes] = useState({} as ResourceNodeType[])
  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes = resourceNodesData
    .map(node => new ResourceNode(
      { ctx, ...node, homeNode, id: `${Math.random()}` }
    ))
    setResourceNodes(newResourceNodes)
  }, [ctx, homeNode, resourceNodesData])

  const drawResourceNodes = () => {
    resourceNodes.forEach(node => {
      node?.transportNode?.updatePosition()
      node?.drawUnit()
    })
  }

  return {
    resourceNodes,
    drawResourceNodes,
  }
}
