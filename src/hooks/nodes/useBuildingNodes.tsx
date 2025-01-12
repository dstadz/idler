import { useEffect, useState, useCallback } from 'react'
// import { useAtom } from 'jotai'

import { CanvasNode } from '@/classes'
// import { resourcesAtom } from '@/atoms'
import { mapDbToCanvasNode } from '@/utils/mappers'
import { createNode, getNodes } from '@/app/api/nodes/route'

export const useBuildingNodes = (ctx: CanvasRenderingContext2D | null) => {
  const [buildingNodes, setBuildingNodes] = useState<CanvasNode>({} as CanvasNode)
  // const [resources, setResources] = useAtom(resourcesAtom)

  useEffect(() => {
    if (!ctx) return
    (async () => {
      const fetchedData = await getNodes()
      if (fetchedData) {
        const newBuildingNodes = mapDbToCanvasNode(fetchedData, ctx)
        setBuildingNodes(newBuildingNodes)
      }
    })()
    }, [ctx])

  const drawBuildingNodes = useCallback(() => {
    if (buildingNodes instanceof CanvasNode) {
      buildingNodes.drawUnit()
    }
  }, [buildingNodes])

  const createBuildingNode = async () => {
    const newNodeData = await createNode({ body: { name: 'Home Node', type: 'buildingNodes' } })
    setBuildingNodes(newNodeData)
  }

  return {
    buildingNodes,
    homeResources,
    drawBuildingNodes,
    createBuildingNode,
  }
}
