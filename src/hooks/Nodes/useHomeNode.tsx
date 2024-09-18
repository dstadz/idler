import { useRef, useEffect, useState } from 'react'
import { Node, ResourceNode } from '@/classes'
import { useCanvas } from '@/hooks'

export const useHomeNode = ({
  canvasRef,
  homeNodeData,
}) => {


  const { ctx, clearWholeRect, drawFPS } = useCanvas(canvasRef)

  const [homeNode, setHomeNode] = useState({} as NodeType)
  useEffect(() => {
    if (!ctx || !homeNodeData) return

    const newHomeNode = new Node(
      { ctx, ...homeNodeData, id: `${Math.random()}` },
    )
    setHomeNode(newHomeNode)
  }, [ctx, homeNodeData])


  return {
    homeNode,
    setHomeNode,
  }
}
