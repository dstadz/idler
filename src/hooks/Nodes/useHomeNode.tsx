import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'

import { CanvasNode } from '@/classes'
import { resourcesAtom } from '@/atoms'
import { UseHomeNodeProps } from '@/utils/interfaces'

export const createHomeNode = async () => {
  console.log(`🚀 ~ file: useHomeNode.tsx:33 ~ createHomeNode ~ :`)
  try {
    const response = await fetch('/api/village/building', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ userId: 123 }),
    })

    if (!response.ok) {
      // Handle server-side errors (e.g., 4xx, 5xx)
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create home node')
    }

    const data = await response.json()
    console.log('Home node created:', data)

    return data
  } catch (error) {
    console.error('Error creating home node:', error)
    throw error // Re-throw to handle it further up the call stack if needed
  }
}


export const useHomeNode = ({ ctx, homeNodeId }: UseHomeNodeProps) => {
  const [homeNode, setHomeNode] = useState<CanvasNode>({} as CanvasNode)
  const [homeResources, setHomeResources] = useAtom(resourcesAtom)

  // useEffect(() => {
  //   if (!ctx) return
  //   const dataRes = [homeNodeData].find(({ id }) => id === homeNodeId)

  //   if (!dataRes) return
  //   const newHomeNode = new CanvasNode({
  //     ctx,
  //     ...dataRes,
  //     uuid: (Math.random().toString(36).slice(2, 10)),
  //   })

  //   setHomeNode(newHomeNode)
  // }, [ctx, homeNodeId])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return
    setHomeResources(homeNode.resources)
  }, [homeNode, setHomeResources])

  const drawHomeNode = useCallback(() => {
    if (homeNode instanceof CanvasNode) {
      homeNode.drawUnit()
    }
  }, [homeNode])

  const createHomeNode = () => {
    setHomeNode(createHomeNode())

  }

  return {
    homeNode,
    homeResources,
    drawHomeNode,
    createHomeNode,
  }
}
