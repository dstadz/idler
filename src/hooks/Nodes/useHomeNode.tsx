import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'

import { CanvasNode } from '@/classes'
import { resourcesAtom } from '@/atoms'
import { mapDbToCanvasNode } from '@/utils/mappers'

const createHomeNodeAPICall = async () => {
  try {
    const response = await fetch('/api/village/building', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'HomeNode' }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create home node')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error creating home node:', error)
    throw error
  }
}

const fetchHomeNodeAPICall = async () => {
  try {
    const response = await fetch('/api/village/building', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch home node')
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Error fetching home node:', error)
    throw error
  }
}

export const useHomeNode = (ctx: CanvasRenderingContext2D | null) => {
  const [homeNode, setHomeNode] = useState<CanvasNode>({} as CanvasNode)
  const [homeResources, setResources] = useAtom(resourcesAtom)

  useEffect(() => {
    if (!ctx) return
    (async () => {
      const fetchedData = await fetchHomeNodeAPICall()

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
