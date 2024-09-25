import { ResourceNode } from '@/classes'
import { useRef, useEffect, useState } from 'react'

export const useResourceNodes = ({
  ctx,
  homeNode,
  resourceNodesData,
}) => {
  const [resourceNodes, setResourceNodes] = useState([] as ResourceNodeType[])
  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes = resourceNodesData
      .map(node => new ResourceNode({
        ctx,
        ...node,
        homeNode,
        uuid: (Math.random().toString(36).slice(2, 10)),
      }))
    setResourceNodes(newResourceNodes)
  }, [ctx, homeNode, resourceNodesData])

  const drawResourceNodes = () => {
    // console.log('drawResourceNodes')
    resourceNodes.forEach(node => node.drawUnit())
  }

  return {
    resourceNodes,
    drawResourceNodes,
  }
}
