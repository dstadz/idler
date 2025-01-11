import { CanvasNode, Planet } from '@/classes'
import { useEffect, useState, useCallback } from 'react'
import { PLANETS as planetsStatic } from '@/utils/constants'
import { useAtom } from 'jotai'
import { planetAtom, resourcesAtom, moneyAtom } from '@/atoms'
import { ResourceRecord } from '@/types/node'
import { getUpgradeCost } from '@/components/PlanetModal'

const PLANETS = planetsStatic.map(planet => ({
  ...planet,
  id: `planet${planet.planetName}`,
}))

interface UsePlanetProps {
  ctx: CanvasRenderingContext2D | null
  homeNode: CanvasNode
}

export const usePlanetNodes = ({ ctx, homeNode }: UsePlanetProps) => {
  const [selectedPlanet, setPlanet] = useAtom(planetAtom)
  const [planets, setPlanets] = useState<Planet[]>([])

  const [, setMainResources] = useAtom(resourcesAtom)
  const addToMainResources = useCallback(
    (resource: keyof ResourceRecord, amount: number) => {
      setMainResources(prev => ({
          ...prev,
          [resource]: prev[resource] ? prev[resource] + amount : amount,
      }))
    },
    [setMainResources]
  )

  useEffect(() => {
    if (!ctx || Object.keys(homeNode).length === 0) return


    const h = 10
    const w = 10
    const node = planetsStatic[0]
    const gridPlants = new Array(h)
    .fill('').map((_, r) => new Array(w)
      .fill('').map((_, c) => new Planet({
      ctx,
      homeNode,
      id: `planet${node.planetName}${r}${c}`,
      parentNode: node,
      position: [r,c],
      size: node.size,
      emoji: node.emoji,
      resources: node.resources,
      levels: node.levels,
      yields: node.yields,
      addToMainResources,
    }))).flatMap(arr => arr)
    setPlanets(gridPlants)
  }, [ctx, homeNode, addToMainResources])

  const drawPlanets = () => {
    planets.forEach(planet => {
      planet.update()
      planet.drawUnit()
      planet.ship.drawUnit()
    })
  }

  const setPlanetsPosition = () => {
    console.log(`🚀 ~ file: usePlanetsNode.tsx:71 ~ setPlanetsPosition ~ planets:`, planets)
    planets.forEach(planet => {
      planet.setHexCoordinates()
    })
  }

  const handleCanvasClick = useCallback(
    (event: MouseEvent) => {
      const canvasRect = (event.target as HTMLCanvasElement).getBoundingClientRect()
      const clickX = event.clientX - canvasRect.left
      const clickY = event.clientY - canvasRect.top

      // Find the planet that was clicked
      const clickedPlanet = planets.find(planet => {
        const [px, py] = planet.position
        const radius = planet.size / 2
        return (
          clickX >= px - radius &&
          clickX <= px + radius &&
          clickY >= py - radius &&
          clickY <= py + radius
        )
      })

      if (clickedPlanet) {
        setPlanet(clickedPlanet)
      }
    },
    [planets, setPlanet]
  )

  useEffect(() => {
    const canvas = ctx?.canvas
    if (!canvas) return

    canvas.addEventListener('click', handleCanvasClick)
    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
    }
  }, [ctx, handleCanvasClick])

  const closeModal = () => setPlanet(null)

  return {
    planets,
    drawPlanets,
    setPlanetsPosition,
    selectedPlanet,
    closeModal,
  }
}
