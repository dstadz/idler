'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { Box, Stack, Typography } from '@mui/material'
import { getResourceList } from '@/utils/constants'
import { resourceNodesData, transportNodesData } from '@/data'
import { useCanvas, useHomeNode, useResourceNodes, useTransportNodes } from '@/hooks'
import { resourcesAtom } from '@/atoms'

const OverworldPage = () => {
  const { ctx, canvasRef, drawFPS, clearWholeRect, handleClick } = useCanvas()
  const [mainResources] = useAtom(resourcesAtom)

  const { homeNode, drawHomeNode, createHomeNode } = useHomeNode(ctx)

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

    const rafIdRefCurrent = requestAnimationFrame(gameLoop)
    rafIdRef.current = rafIdRefCurrent
  }, [clearWholeRect, drawFPS, drawHomeNode, drawResourceNodes, drawTransportNodes, ctx])

  useEffect(() => {
    if (
      !homeNode ||
      !resourceNodes.length ||
      !transportNodes.length  ||
      rafIdRef.current
    ) return

    requestAnimationFrame(gameLoop)
  }, [gameLoop, homeNode, resourceNodes, transportNodes])

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Box>
        Home
        <div>
        <Typography>
        {Object.keys(mainResources).length > 0 ? (
              getResourceList({ resourceObject: mainResources })
                .map(resource => <div key={resource}>{resource}</div>)
            ) : 'No resources available'}
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
