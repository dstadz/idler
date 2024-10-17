'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { Box, Stack } from '@mui/material'
import { resourceNodesData, transportNodesData } from '@/data'
import { useCanvas, useHomeNode, useResourceNodes, useTransportNodes } from '@/hooks'

const Canvas = () => {
  const { ctx, canvasRef, drawFPS, clearWholeRect, handleClick } = useCanvas()
  console.log(`🚀 ~ file: page.tsx:13 ~ OverworldPage ~ ctx:`, ctx)

  const { homeNode, drawHomeNode } = useHomeNode(ctx)
  const { resourceNodes, drawResourceNodes } = useResourceNodes({
    ctx,
    homeNode,
    resourceNodesData,
  })
  const { transportNodes, drawTransportNodes } = useTransportNodes({
    ctx,
    homeNode,
    resourceNodes,
    transportNodesData,
  })

  const rafIdRef = useRef<number | null>(null)
  const gameLoop = useCallback((timestamp: number) => {
    if (!canvasRef.current) return

    clearWholeRect(canvasRef.current)
    drawFPS(timestamp)

    drawHomeNode()
    drawResourceNodes()
    drawTransportNodes()

    rafIdRef.current = requestAnimationFrame(gameLoop)
  }, [canvasRef, clearWholeRect, drawFPS, drawHomeNode, drawResourceNodes, drawTransportNodes])

  useEffect(() => {
    if (
      !homeNode ||
      !resourceNodes.length ||
      !transportNodes.length ||
      rafIdRef.current
    ) return

    rafIdRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop, homeNode, resourceNodes, transportNodes])

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Box>
        This is the Canvas
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-2 border-purple-500 border-rounded"
          onClick={handleClick}
        />
      </Box>
    </Stack>
  )
}

export default Canvas
