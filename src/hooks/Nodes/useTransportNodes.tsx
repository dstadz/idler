import { TransportNode } from '@/classes'
import { UseTransportNodeProps } from '@/interfaces'
import { TransportNodeType } from '@/types/node'
import { useMemo, useEffect, useState, useCallback } from 'react'

export const useTransportNodes = ({
  ctx,
  homeNode,
  transportNodesData,
  resourceNodes,
}: UseTransportNodeProps) => {

  const newTransportNodes = useMemo(() => {
    if (!ctx || !homeNode || !transportNodesData || resourceNodes.length === 0) {
      return []
    }
    return transportNodesData.map(node =>
      new TransportNode({
        ctx,
        ...node,
        homeNode,
        uuid: (Math.random().toString(36).slice(2, 10)),
        position: homeNode.position,
        parentNode: resourceNodes.find(({ id }) => id === node.parentId),
      })
    )
  }, [ctx, homeNode, resourceNodes, transportNodesData])

  const [transportNodes, setTransportNodes] = useState([] as TransportNodeType[])
  useEffect(() => {
    setTransportNodes(newTransportNodes)
  }, [newTransportNodes])

  const drawTransportNodes = useCallback(() => {
    transportNodes.forEach(node => node.drawUnit())
  }, [transportNodes])

  return {
    transportNodes,
    drawTransportNodes,
  }
}
