import { resourcesAtom } from '@/atoms'
import { TransportNode } from '@/classes'
import { UseTransportNodeProps } from '@/interfaces'
import { ResourceRecord, TransportNodeType } from '@/types/node'
import { useAtom } from 'jotai'
import { useMemo, useEffect, useState, useCallback } from 'react'

export const useTransportNodes = ({
  ctx,
  homeNode,
  transportNodesData,
  resourceNodes,
}: UseTransportNodeProps) => {
  const [, setMainResources] = useAtom(resourcesAtom)

  const newTransportNodes = useMemo(() => {
    if (
      !ctx ||
      !Object.keys(homeNode).length ||
      !transportNodesData ||
      resourceNodes.length === 0
    ) return []

    const addToMainResources = (resource: keyof ResourceRecord, amount: number) =>
      setMainResources(prev => ({
        ...prev,
        [resource]: (prev[resource] || 0) + amount,
      }))

    return transportNodesData.map(node => {
      const parentNode = resourceNodes.find(({ id }) => id === node.parentId)

      return new TransportNode({
        ctx,
        ...node,
        homeNode,
        parentNode,
        position: homeNode.position,
        addToMainResources,
      })
    })
  }, [ctx, homeNode, transportNodesData, resourceNodes, setMainResources])

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
