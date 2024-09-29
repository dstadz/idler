import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'

import { CanvasNode } from '@/classes'
import { resourcesAtom } from '@/atoms'
import { UseHomeNodeProps } from '@/interfaces'
import { homeNodeData } from '@/data'

export const useHomeNode = ({ ctx, homeNodeId }: UseHomeNodeProps) => {
  const [homeNode, setHomeNode] = useState<CanvasNode>({} as CanvasNode)
  const [homeResources, setHomeResources] = useAtom(resourcesAtom)

  useEffect(() => {
    if (!ctx || !homeNodeData) return
    const dataRes = [homeNodeData].find(({ id }) => id === homeNodeId)

    if (!dataRes) return
    const newHomeNode = new CanvasNode({
      ctx,
      ...dataRes,
      uuid: (Math.random().toString(36).slice(2, 10)),
    })

    setHomeNode(newHomeNode)
  }, [ctx, homeNodeId])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return
    setHomeResources(homeNode.resources)
  }, [homeNode, setHomeResources])

  const drawHomeNode = useCallback(() => {
    if (homeNode instanceof CanvasNode) {
      homeNode.drawUnit()
    }
  }, [homeNode])

  return {
    homeNode,
    homeResources,
    drawHomeNode,
  }
}
