import { TransportNode } from '@/classes'
import { useRef, useEffect, useState, useCallback } from 'react'

export const useTransportNodes = ({
  ctx,
  homeNode,
  transportNodesData,
  resourceNodes,
}) => {

  const [transportNodes, setTransportNodes] = useState([] as TransportNodeType[])
  useEffect(() => {
    if (
      !ctx ||
      !homeNode ||
      !transportNodesData
      || resourceNodes.length === 0
    ) return

    console.log(resourceNodes)
    const newTransportNodes = transportNodesData
      .map(node => {
        return new TransportNode({
        ctx,
        ...node,
        homeNode,
        position: homeNode.position,
        parentNode: resourceNodes.find(({ id }) => id === node.parentId) })
      })

    setTransportNodes(newTransportNodes)
  }, [ctx, homeNode, resourceNodes, transportNodesData])

  const drawTransportNodes = useCallback(() => {
    transportNodes.forEach(node => {
      node.drawUnit()
    })
  }, [transportNodes])

  return {
    transportNodes,
    drawTransportNodes,
  }
}
