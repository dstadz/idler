import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'

import { Node } from '@/classes'
import { RESOURCES } from '@/utils/contants'
import { resourcesAtom } from '@/atoms'

export const useHomeNode = ({ ctx, homeNodeData }) => {
  const [homeNode, setHomeNode] = useState<NodeType>({} as NodeType)
  const [homeResources, setHomeResources] = useAtom(resourcesAtom)

  useEffect(() => {
    if (!ctx || !homeNodeData) return

    const newHomeNode = new Node({ ctx, ...homeNodeData, uuid: (Math.random().toString(36).slice(2, 10)) })

    setHomeNode(newHomeNode)
  }, [ctx, homeNodeData])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return
    setHomeResources(homeNode.resources)
  }, [homeNode, setHomeResources])
  const drawHomeNode = useCallback(() => homeNode.drawUnit(), [homeNode])

  return {
    homeNode,
    homeResources,
    drawHomeNode,
  }
}
