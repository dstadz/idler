import { useRef, useEffect, useState } from 'react'
import { Node, ResourceNode } from '@/classes'

export const useHomeNode = ({
  ctx,
  homeNodeData,
}) => {
  const [homeNode, setHomeNode] = useState({} as NodeType)
  useEffect(() => {
    if (!ctx || !homeNodeData) return

    const newHomeNode = new Node(
      { ctx, ...homeNodeData, id: `${Math.random()}` },
    )
    setHomeNode(newHomeNode)
  }, [ctx, homeNodeData])

  const drawHomeNode = () => {
    homeNode.drawUnit()
  }

  return {
    homeNode,
    drawHomeNode,
  }
}
