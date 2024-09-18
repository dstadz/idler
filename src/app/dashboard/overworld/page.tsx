'use client'

import Canvas from '@/components/Canvas'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { RESOURCES } from '@/utils/contants'


  const homeNode: NodeType = {
    position: [400, 400],
    emoji: '🏰',
    size: 40,
    inventory: {},
    resources: {},
  }

  const resourceNodesData: ResourceNodeType[] = [
    {
      position: [100, 150],
      emoji: '🌋',
      size: 40,
      resources: {
        [RESOURCES.STONE.emoji]: 2000,
      },
      transportNode: {
        speed: 0.9,
        emoji: '🐉',
        size: 16 ,
        strength: 2,
        dexterity: 5,
      },
    }, {
      position: [600, 200],
      emoji: '🌲',
      size: 40,
      resources: {
        [RESOURCES.FOOD.emoji]: 2000,
        [RESOURCES.WOOD.emoji]: 1000,
      },
      transportNode: {
        speed: 1.25,
        emoji: '🦄',
        size: 16,
        strength: 5,
        dexterity: 2,
      },
    }
  ]

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
        <Canvas homeNode={homeNode} resourceNodesData={resourceNodesData} />
      </Box>
    </Stack>
  )
}

export default OverworldPage
