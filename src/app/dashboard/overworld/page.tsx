'use client'

import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { getResourceList, RESOURCES } from '@/utils/constants'
import { homeNodeData, resourceNodesData, transportNodesData } from '@/data'
import { useAtom } from 'jotai'
import { useCanvas, useHomeNode, useResourceNodes, useTransportNodes } from '@/hooks'
import { NodeType, NodeTypeData, ResourceRecord } from '@/types/node'

type HomeResourcesType = {
  [key: string]: number
}

const OverworldPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx, drawFPS, clearWholeRect } = useCanvas(canvasRef)
  const { homeNode, homeResources, drawHomeNode } = useHomeNode({
    ctx: ctx as CanvasRenderingContext2D,
    homeNodeData: homeNodeData as NodeTypeData,
  })
  // Make sure homeResources is typed correctly
    // Return early if homeNode is still null

  const { resourceNodes, drawResourceNodes } = useResourceNodes({
    ctx,
    homeNode,
    resourceNodesData
  })

  const { transportNodes, drawTransportNodes } = useTransportNodes({
    ctx,
    homeNode,
    resourceNodes,
    transportNodesData
  })
  const gameLoop = useCallback((timestamp: number) => {
    if (!canvasRef.current) return

    clearWholeRect(canvasRef.current)
    drawFPS(timestamp)
    drawHomeNode()
    drawResourceNodes()
    drawTransportNodes()
    requestAnimationFrame(gameLoop)
  }, [
    clearWholeRect,
    drawFPS,
    drawHomeNode,
    drawResourceNodes,
    drawTransportNodes,
  ])

  useEffect(() => {
    if (!resourceNodes.length || !transportNodes.length) return
    const rafId = requestAnimationFrame(gameLoop)

    return () => cancelAnimationFrame(rafId)  // Clean up on component unmount
  }, [gameLoop, resourceNodes, transportNodes])

  if (!homeNode) {
    return <div>Loading home node...</div>
  }
  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Box>
        Home
        <div>
          <button onClick={() => console.log(homeNode.resources)}>
            <Typography>
              {homeNode.emoji}:
            </Typography>
          </button>
          <Typography>
          {Object.keys(homeResources).length > 0 ? (
            getResourceList({ resourceObject: homeNode.resources })
              .map(resource =><div key={resource}>{resource}</div>)
            ) : (
              <div>No resources available</div>
            )}
          </Typography>
        </div>
      </Box>
      <Box>
        This is the Overworld Page Content
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-2 border-purple-500 border-rounded"
        />
      </Box>
    </Stack>
  )
}

export default OverworldPage
