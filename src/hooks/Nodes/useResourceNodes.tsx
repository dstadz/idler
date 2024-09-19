import { ResourceNode } from '@/classes'
import { useRef, useEffect, useState } from 'react'

export const useResourceNodes = ({
  ctx,
  homeNode,
  setHomeResources,
  resourceNodesData,
}) => {
  const [resourceNodes, setResourceNodes] = useState({} as ResourceNodeType[])
  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes = resourceNodesData
    .map(node => new ResourceNode(
      { ctx, ...node, homeNode, id: `${Math.random()}`, setHomeResources }
    ))
    setResourceNodes(newResourceNodes)
  }, [ctx, homeNode, resourceNodesData, setHomeResources])

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
