'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { getResourceList } from '@/utils/constants'
import { resourceNodesData, transportNodesData } from '@/data'
import { useCanvas, useHomeNode, useResourceNodes, useTransportNodes } from '@/hooks'
import { useAtom } from 'jotai'
import { resourcesAtom } from '@/atoms'

const OverworldPage = () => {
  const { ctx, canvasRef, drawFPS, clearWholeRect, handleClick } = useCanvas()
  const [mainResources] = useAtom(resourcesAtom)

  const { homeNode, drawHomeNode } = useHomeNode({
    ctx: ctx as CanvasRenderingContext2D,
    homeNodeId: 'homeNode123',
  })

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

  const rafIdRef = useRef<number | null>(null)  // Track the animation frame
  const frameCountRef = useRef(0)  // Keep track of the frame count

  // Consolidated game loop that draws everything
  const gameLoop = useCallback((timestamp: number) => {
    if (!canvasRef.current) return

    clearWholeRect(canvasRef.current)
    drawFPS(timestamp)

    // Drawing game-related nodes
    drawHomeNode()
    drawResourceNodes()
    drawTransportNodes()

    // Oscillating circle logic
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20 * Math.sin(frameCountRef.current * 0.005) ** 2, 0, 2 * Math.PI)
    ctx.fill()

    frameCountRef.current += 1
    // rafIdRef.current =
    requestAnimationFrame(gameLoop)
  }, [clearWholeRect, drawFPS, drawHomeNode, drawResourceNodes, drawTransportNodes, ctx])

  useEffect(() => {
    if (!homeNode || !resourceNodes.length || !transportNodes.length) return

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(gameLoop)  // Start the loop
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)  // Clean up any existing loops
      }
    }
  }, [gameLoop, homeNode, resourceNodes, transportNodes])

  // Prevent state re-renders from affecting the game loop
  // useEffect(() => {
  //   if (!mainResources) return

  //   console.log(mainResources)
  // }, [mainResources])

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
          <button onClick={() => console.log(mainResources)}>
            <Typography>
              main:
            </Typography>
          </button>
          <Typography>
            {Object.keys(mainResources).length > 0 ? (
              getResourceList({ resourceObject: mainResources.resources })
                .map(resource => <div key={resource}>{resource}</div>)
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
          onClick={handleClick}
        />
      </Box>
    </Stack>
  )
}

export default OverworldPage
