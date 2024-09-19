import { useEffect, useState, useCallback } from 'react'
import { Node } from '@/classes'
import { RESOURCES } from '@/utils/contants'

export const useHomeNode = ({ ctx, homeNodeData }) => {
  const [homeNode, setHomeNode] = useState<NodeType>({} as NodeType)
  const [homeResources, setHomeResources] = useState(Object.keys(RESOURCES).map(r => `${RESOURCES[r].emoji}: 0`))

  useEffect(() => {
    if (!ctx || !homeNodeData) return

    const newHomeNode = new Node({
      ctx,
      ...homeNodeData,
      id: `${Math.random()}`,
    })

    setHomeNode(newHomeNode)
  }, [ctx, homeNodeData])

  useEffect(() => {
    // Update resources when homeNode changes
    if (!homeNode || !homeNode.resources) return

    setHomeResources(homeNode.resources) // Set the correct resources from homeNode
  }, [homeNode])

  const drawHomeNode = useCallback(() => {
    homeNode.drawUnit()
  }, [homeNode, homeResources])

  return {
    homeNode,
    homeResources,
    setHomeResources,
    drawHomeNode,
  }
}
