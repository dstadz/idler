import { useEffect, useState, useCallback } from 'react'
import { useAtom } from 'jotai'

import { Node } from '@/classes'
import { RESOURCES } from '@/utils/constants'
import { resourcesAtom } from '@/atoms'
import { NodeType, NodeTypeData } from '@/types/node' // Ensure this import path is correct
import { UseHomeNodeProps } from '@/interfaces'

export const useHomeNode = ({ ctx, homeNodeData }: UseHomeNodeProps) => {
  const [homeNode, setHomeNode] = useState<NodeType>({} as NodeType) // State for the home node
  const [homeResources, setHomeResources] = useAtom(resourcesAtom) // Atom to manage resources

  useEffect(() => {
    if (!ctx || !homeNodeData) return // Exit if context or node data is missing

    // Create a new Node instance with provided context and data
    const newHomeNode = new Node({
      ctx,
      ...homeNodeData,
      uuid: (Math.random().toString(36).slice(2, 10)), // Unique UUID generation
    })

    setHomeNode(newHomeNode) // Update the home node state
  }, [ctx, homeNodeData])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return // Exit if homeNode or its resources are missing
    setHomeResources(homeNode.resources) // Update resources atom with home node's resources
  }, [homeNode, setHomeResources])

  const drawHomeNode = useCallback(() => {
    if (homeNode) {
      homeNode.drawUnit() // Draw the home node
    }
  }, [homeNode])

  return {
    homeNode,
    homeResources,
    drawHomeNode,
  }
}
