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


  useEffect(() => {
    if (!('drawUnit' in homeNode)) return

    const gameLoop = (timestamp: number) => {
      homeNode.drawUnit()
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)
  }, [homeNode])

  return {
    homeNode,
    setHomeNode,
  }
}
