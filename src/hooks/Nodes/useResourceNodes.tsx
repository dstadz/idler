import { ResourceNode } from '@/classes'
import { useRef, useEffect, useState } from 'react'
import { UseResourceNodeProps  } from '@/interfaces'

export const useResourceNodes = ({
  ctx,
  homeNode,
  resourceNodesData,
}: UseResourceNodeProps ) => {
  const [resourceNodes, setResourceNodes] = useState([] as ResourceNode[])
  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes: ResourceNode[] = resourceNodesData
      .map(node => new ResourceNode({
        ctx,
        ...node,
        homeNode,
        uuid: (Math.random().toString(36).slice(2, 10)),
      }))
    setResourceNodes(newResourceNodes)
  }, [ctx, homeNode, resourceNodesData])

  const drawResourceNodes = () => {
    resourceNodes.forEach(node => node.drawUnit())
  }

  return {
    resourceNodes,
    drawResourceNodes,
  }
}
