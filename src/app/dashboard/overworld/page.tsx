'use client'

import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Canvas from '@/components/Canvas'
import { RESOURCES } from '@/utils/contants'
import { homeNodeData, resourceNodesData } from '@/data'

  const OverworldPage = () => {

  return (
    <Stack flexDirection="row" justifyContent="space-between">
      <Box>
        Resources

        {resourceNodesData.map(node => (
          <div key={node.id}>
            <Typography>
              {node.emoji}
            </Typography>
            {Object.keys(node.resources).map(resource => (
              <Typography key={resource}>
                {resource}: {node.resources[resource]}
              </Typography>
            ))}
          </div>
        ))}
      </Box>
      <Box>
        This is the Overworld Page Content
        <Canvas homeNodeData={homeNodeData} resourceNodesData={resourceNodesData} />
      </Box>
    </Stack>
  )
}

export default OverworldPage
