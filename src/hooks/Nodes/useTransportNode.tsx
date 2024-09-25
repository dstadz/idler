import { TransportNode } from '@/classes'
import { useRef, useEffect, useState } from 'react'

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
  }, [ctx, homeNode, resourceNodes])

  const drawTransportNodes = () => transportNodes.forEach(node => node?.drawUnit())

  return {
    transportNodes,
    drawTransportNodes,
  }
}
