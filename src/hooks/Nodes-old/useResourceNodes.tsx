import { ResourceNode } from '@/classes'
import { useEffect, useState } from 'react'
import { UseResourceNodeProps } from '@/interfaces'

export const useResourceNodes = ({
  ctx,
  homeNode,
  resourceNodesData,
}: UseResourceNodeProps) => {
  const [resourceNodes, setResourceNodes] = useState<ResourceNode[]>([])

  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes: ResourceNode[] = resourceNodesData
      .map(node => new ResourceNode({
        ctx,
        id: node.id,
        position: node.position,
        size: node.size,
        emoji: node.emoji,
        resources: node.resources,
        homeNode,
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
