import { TransportNode } from '@/classes'
import { useMemo, useEffect, useState, useCallback } from 'react'

export const useTransportNodes = ({
  ctx,
  homeNode,
  transportNodesData,
  resourceNodes,
}) => {

  // Memoizing the transport nodes calculation
  const newTransportNodes = useMemo(() => {
    if (!ctx || !homeNode || !transportNodesData || resourceNodes.length === 0) {
      return []
    }
    return transportNodesData.map(node =>
      new TransportNode({
        ctx,
        ...node,
        homeNode,
        uuid: (Math.random().toString(36).slice(2, 10)), // Generate a random uuid for each node
        position: homeNode.position,
        parentNode: resourceNodes.find(({ id }) => id === node.parentId),
      })
    )
  }, [ctx, homeNode, resourceNodes, transportNodesData])

  // Storing transport nodes in state
  const [transportNodes, setTransportNodes] = useState([] as TransportNodeType[])

  // Use effect to set state only when new transport nodes are computed
  useEffect(() => {
    setTransportNodes(newTransportNodes)
  }, [newTransportNodes])

  // Memoize the draw function as well to avoid unnecessary recalculations
  const drawTransportNodes = useCallback(() => {
    transportNodes.forEach(node => node.drawUnit())
  }, [transportNodes])

  return {
    transportNodes,
    drawTransportNodes,
  }
}
