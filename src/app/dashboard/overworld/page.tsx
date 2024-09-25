'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { RESOURCES } from '@/utils/contants'
import { homeNodeData, resourceNodesData } from '@/data'
import { useCanvas, useHomeNode, useResourceNodes } from '@/hooks'

const OverworldPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx, clearWholeRect, drawFPS } = useCanvas(canvasRef)
  const {
    homeNode,
    homeResources,
    drawHomeNode,
    setHomeResources,
  } = useHomeNode({ ctx, homeNodeData })


  useEffect(() => {
    // console.log('🚀  homeResources:', homeResources)
  }, [homeResources])

  const { resourceNodes, drawResourceNodes } = useResourceNodes({
    ctx,
    homeNode,
    resourceNodesData,
    setHomeResources,
  })

  useEffect(() => {
    if (!resourceNodes.length) return
    const gameLoop = (timestamp: number) => {
      clearWholeRect(canvasRef.current)
      drawFPS(timestamp)
      drawHomeNode()
      drawResourceNodes()
      requestAnimationFrame(gameLoop)
    }
    requestAnimationFrame(gameLoop)
  }, [
    resourceNodes,
    clearWholeRect,
    canvasRef,
    drawFPS,
    drawHomeNode,
    drawResourceNodes,
  ])


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
        <button onClick={() => console.log(homeResources)}>
          Resources
        </button>
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
