'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Canvas from '@/components/Canvas'
import { RESOURCES } from '@/utils/contants'
import { homeNodeData, resourceNodesData } from '@/data'
import { useCanvas, useHomeNode } from '@/hooks'

const OverworldPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ctx, clearWholeRect, drawFPS } = useCanvas(canvasRef)
  const { homeNode, drawHomeNode, homeResources, setHomeResources } = useHomeNode({ ctx, homeNodeData })

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
        <Canvas
          canvasRef={canvasRef}
          resourceNodesData={resourceNodesData}
          homeNode={homeNode}
          drawHomeNode={drawHomeNode}
          setHomeResources={setHomeResources}
        />
      </Box>
    </Stack>
  )
}

export default OverworldPage
