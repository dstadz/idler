import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'

import { Node } from '@/classes'
import { RESOURCES } from '@/utils/constants'
import { resourcesAtom } from '@/atoms'
import { NodeTypeData } from '@/types/node'
import { UseHomeNodeProps } from '@/interfaces'

export const useHomeNode = ({ ctx, homeNodeData }: UseHomeNodeProps) => {
  const [homeNode, setHomeNode] = useState<Node>({} as Node)
  const [homeResources, setHomeResources] = useAtom(resourcesAtom)

  useEffect(() => {
    if (!ctx || !homeNodeData) return

    const newHomeNode = new Node({
      ctx,
      ...homeNodeData,
      uuid: (Math.random().toString(36).slice(2, 10)),
    })

    setHomeNode(newHomeNode)
  }, [ctx, homeNodeData])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return
    setHomeResources(homeNode.resources)
  }, [homeNode, setHomeResources])

  const drawHomeNode = useCallback(() => {
    if (homeNode) {
      homeNode.drawUnit()
    }
  }, [homeNode])

  return {
    homeNode,
    homeResources,
    drawHomeNode,
  }
}
