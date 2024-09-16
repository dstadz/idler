'use client'

import Canvas from '@/components/Canvas'
import React from 'react'

const OverworldPage = () => {

  const units = [
    { position: [100, 150], target: [400, 300], speed: 5, node: '🐉', size: 60, children: [] },
    { position: [200, 250], target: [500, 350], speed: 3, node: '🦄', size: 50, children: [] },
    { position: [300, 350], target: [600, 400], speed: 4, node: '🐎', size: 48, children: [] }
  ]

  return (
    <div>
      This is the Overworld Page Content
      <Canvas units={units} />
    </div>
  )
}

export default OverworldPage
