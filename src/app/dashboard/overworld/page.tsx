'use client'

import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { RESOURCES } from '@/utils/contants'
import { homeNodeData, resourceNodesData } from '@/data'
import { useAtom } from 'jotai'
import { resourcesAtom } from '@/atoms/resources'
import { Node, ResourceNode, TransportNode } from '@/classes'
import { transportNodesData } from '@/data/Nodes'
import { useCanvas, useHomeNode, useResourceNodes, useTransportNodes } from '@/hooks'

const OverworldPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx, drawFPS, clearWholeRect } = useCanvas(canvasRef)
  const { homeNode, homeResources, drawHomeNode } = useHomeNode({ ctx, homeNodeData })
  const { resourceNodes, drawResourceNodes } = useResourceNodes({ ctx, homeNode, resourceNodesData })
  const { transportNodes, drawTransportNodes } = useTransportNodes({ ctx, homeNode, resourceNodes, transportNodesData })

  const gameLoop = useCallback((timestamp: number) => {
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
    if (!resourceNodes.length) return
    requestAnimationFrame(gameLoop)
  }, [gameLoop, resourceNodes])

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
              Object.keys(homeResources).map(key => (
                <div key={key}>
                  {key}: {homeResources?.[key] || 0}
                </div>
              ))
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
