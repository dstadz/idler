'use client'

import Canvas from '@/components/Canvas'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const OverworldPage = () => {

  const homeNode: NodeType = {
    position: [400, 400],
    emoji: '🏰',
    size: 30,
    inventory: {},
    resources: {},
  }

  const resourceNodesData: ResourceNodeType[] = [
    {
      position: [100, 150],
      emoji: '🌋',
      size: 20,
      resources: {
        stone: 2000,
      },
      transportNode: { speed: 0.9, emoji: '🐉', size: 16 , strength: 20 },
    }, {
      position: [600, 200],
      emoji: '🌲',
      size: 20,
      resources: {
        wood: 2000,
        food: 1000,
      },
      transportNode: { speed: 1.25, emoji: '🦄', size: 16, strength: 5 },
    }
  ]

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
        <Canvas homeNode={homeNode} resourceNodesData={resourceNodesData} />
      </Box>
    </Stack>
  )
}

export default OverworldPage
