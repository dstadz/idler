import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'

import { CanvasNode } from '@/classes'
import { resourcesAtom } from '@/atoms'
import { mapDbToCanvasNode } from '@/utils/mappers'
import { createNode, getNodes } from '@/app/api/nodes/route'
import { get } from 'http'

const createHomeNodeAPICall = async () => {
  createNode({ body: { name: 'Home Node', type: 'HomeNode' } })
  // try {
  //   const response = await fetch('/api/village/building', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ type: 'HomeNode' }),
  //   })

  //   if (!response.ok) {
  //     const errorData = await response.json()
  //     throw new Error(errorData.message || 'Failed to create home node')
  //   }

  //   const data = await response.json()

  //   return data
  // } catch (error) {
  //   console.error('Error creating home node:', error)
  //   throw error
  // }
}

const fetchHomeNodeAPICall = async () => {
    const nodes = await getNodes()
  // try {
  //   const response = await fetch('/api/village/building', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })

  //   if (!response.ok) {
  //     const errorData = await response.json()
  //     throw new Error(errorData.message || 'Failed to fetch home node')
  //   }

  //   const data = await response.json()
  //   return data

  // } catch (error) {
  //   console.error('Error fetching home node:', error)
  //   throw error
  // }
  return nodes
}

export const useHomeNode = (ctx: CanvasRenderingContext2D | null) => {
  const [homeNode, setHomeNode] = useState<CanvasNode>({} as CanvasNode)
  const [homeResources, setResources] = useAtom(resourcesAtom)

  useEffect(() => {
    if (!ctx) return
    (async () => {
      const fetchedData = await fetchHomeNodeAPICall()
      console.log(`🚀 ~ file: useHomeNode.tsx:59 ~ fetchedData:`, fetchedData)

      if (fetchedData) {
        const newHomeNode = mapDbToCanvasNode(fetchedData, ctx)
        setHomeNode(newHomeNode)
      }
    })()
    }, [ctx])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return
    setResources(homeNode.resources)
  }, [homeNode, setResources])

  const drawHomeNode = useCallback(() => {
    if (homeNode instanceof CanvasNode) {
      homeNode.drawUnit()
    }
  }, [homeNode])

  const createHomeNode = async () => {
    const newNodeData = await createHomeNodeAPICall()
    setHomeNode(newNodeData)
  }

  return {
    homeNode,
    homeResources,
    drawHomeNode,
    createHomeNode,
  }
}
