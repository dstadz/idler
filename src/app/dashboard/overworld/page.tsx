'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { RESOURCES } from '@/utils/contants'
import { homeNodeData, resourceNodesData } from '@/data'
import { useAtom } from 'jotai'
import { resourcesAtom } from '@/atoms/resources'
import { Node, ResourceNode, TransportNode } from '@/classes'
import { transportNodesData } from '@/data/Nodes'

const OverworldPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  const [homeNode, setHomeNode] = useState<NodeType>({} as NodeType)
  const [homeResources, setHomeResources] = useAtom(resourcesAtom)
  const [resourceNodes, setResourceNodes] = useState([] as ResourceNodeType[])
  const [transportNodes, setTransportNodes] = useState([] as TransportNodeType[])













  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    setCtx(context)
  }, [canvasRef])



  const fpsRef = useRef(0)
  let lastFrameTime = performance.now()
  let frameCount = 0
  let fpsTime = 0
  const drawFPS = useCallback((timestamp: number) => {
    if (!ctx) return
    const deltaTime = timestamp - lastFrameTime
    lastFrameTime = timestamp
    frameCount++
    fpsTime += deltaTime

    if (fpsTime >= 1000) {
      fpsRef.current = frameCount
      frameCount = 0
      fpsTime = 0
    }
    ctx.fillText(`FPS: ${fpsRef.current}`, 10, 20)
  }, [ctx])

  useEffect(() => {
    // console.log('🚀  homeResources:', homeResources)
  }, [homeResources])


  const clearWholeRect = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [ctx])
  const drawHomeNode = useCallback(() => { homeNode.drawUnit() }, [homeNode])
  const drawResourceNodes = () => { resourceNodes.forEach(node => { node.drawUnit() }) }
  const drawTransportNodes = () => {
    transportNodes.forEach(node => {
      node?.drawUnit()
    })
  }
  const gameLoop = (timestamp: number) => {
    clearWholeRect(canvasRef.current)
    drawFPS(timestamp)
    drawHomeNode()
    drawResourceNodes()
    drawTransportNodes()
    requestAnimationFrame(gameLoop)
  }
  useEffect(() => {
    if (!resourceNodes.length) return
    requestAnimationFrame(gameLoop)
  }, [
    resourceNodes,
    clearWholeRect,
    canvasRef,
    drawFPS,
    drawHomeNode,
    drawResourceNodes,
    drawTransportNodes
  ])

  useEffect(() => {
    if (!ctx || !homeNodeData) return

    const newHomeNode = new Node({
      ctx,
      ...homeNodeData,
      id: `${Math.random()}`,
    })

    setHomeNode(newHomeNode)
  }, [ctx, homeNodeData])

  useEffect(() => {
    if (!homeNode || !homeNode.resources) return
    setHomeResources(homeNode.resources)
  }, [homeNode, setHomeResources])

  // create resource nodes
  useEffect(() => {
    if (!ctx || !homeNode || !resourceNodesData) return

    const newResourceNodes = resourceNodesData
      .map(node => new ResourceNode(
        { ctx, ...node, homeNode }
      ))
    setResourceNodes(newResourceNodes)
  }, [ctx, homeNode])



  // create transport nodes
  useEffect(() => {
    if (!ctx || !homeNode || !transportNodesData || resourceNodes.length === 0) return

    console.log(resourceNodes)
    const newTransportNodes = transportNodesData
      .map(node => {
        console.log({ node, homeNode })
        return new TransportNode({
        ctx,
        ...node,
        homeNode,
        position: homeNode.position,
        parentNode: resourceNodes.find(({ id }) => id === node.parentId) })
      })

      console.log(`🚀 ~ file: page.tsx:143 ~ :`, newTransportNodes)
    setTransportNodes(newTransportNodes)
  }, [ctx, homeNode, resourceNodes])

  useEffect(() => () => setCtx(null), [])

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
