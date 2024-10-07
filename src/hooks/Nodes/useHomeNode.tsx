import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'
import { getSession } from 'next-auth/react'

import { CanvasNode } from '@/classes'
import { resourcesAtom } from '@/atoms'
import { mapDbToCanvasNode } from '@/utils/mappers'

const createHomeNodeAPICall = async (userId: number) => {
  try {
    const response = await fetch('/api/village/building', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to create home node')
    }

    const data = await response.json()
    console.log('Home node created:', data)

    return data
  } catch (error) {
    console.error('Error creating home node:', error)
    throw error
  }
}

const fetchHomeNodeAPICall = async () => {
  try {
    const response = await fetch(`/api/village/building`, {
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

export const useHomeNode = (ctx: CanvasRenderingContext2D) => {
  const [homeNode, setHomeNode] = useState<CanvasNode>({} as CanvasNode)
  const [homeResources, setHomeResources] = useAtom(resourcesAtom)

  useEffect(() => {
    const loadHomeNode = async () => {
      const fetchedData = await fetchHomeNodeAPICall()

      if (fetchedData) {
        const newHomeNode = mapDbToCanvasNode(fetchedData, ctx)
        setHomeNode(newHomeNode)
      }
    }

    if (!ctx) return
    loadHomeNode()
  }, [ctx])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return
    setHomeResources(homeNode.resources)
  }, [homeNode, setHomeResources])

  const drawHomeNode = useCallback(() => {
    if (homeNode instanceof CanvasNode) {
      homeNode.drawUnit()
    }
  }, [homeNode])

  const createHomeNode = async () => {
    const session = await getSession()
    if (session?.user?.id) {
      const userId = session.user.id
      const newNodeData = await createHomeNodeAPICall(userId)
      setHomeNode(newNodeData)
    }
  }

  return {
    homeNode,
    homeResources,
    drawHomeNode,
    createHomeNode,
  }
}
