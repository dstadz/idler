import { Planet } from '@/classes'
import { useEffect, useState } from 'react'
import { UsePlanetProps } from '@/interfaces'
import { PLANETS as planetsStatic, RESOURCES } from '@/utils/constants'
import { useAtom } from 'jotai'
import { resourcesAtom } from '@/atoms'
import { ResourceRecord } from '@/types/node'

const PLANETS = planetsStatic.map(planet => ({
  ...planet,
  levels: {
    mineRate: 1,
    shipSpeed: 1,
    cargo: 1,
  },
  id: `planet${planet.id}`,
  position: [500, 100],
  resources: {
    ...(Object.fromEntries(
      Object.keys(RESOURCES).map(key => [key, 0])
    ) as ResourceRecord),
    [RESOURCES.WATER.NAME.toUpperCase()]: 2000,
    [RESOURCES.WOOD.NAME.toUpperCase()]: 1000,
  },
}))

export const usePlanets = ({
  ctx,
  homeNode,
}: UsePlanetProps) => {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [, setMainResources] = useAtom(resourcesAtom)
  const addToMainResources = (
    resource: keyof ResourceRecord,
    amount: number,
  ) => {
    setMainResources(prev => ({
      ...prev,
      [resource]: prev[resource] + amount,
    }))
  }

  useEffect(() => {
    if (!ctx || !homeNode) return

    const newPlanets: Planet[] = PLANETS
      .map(node => new Planet({
        ctx,
        id: node.id,
        position: node.position,
        size: node.size,
        emoji: node.emoji,
        resources: node.resources,
        homeNode,
        levels: node.levels,
        addToMainResources,
      }))
    setPlanets(newPlanets)
  }, [ctx, homeNode, addToMainResources])

  const drawPlanets = () => {
    planets.forEach(node => {
      node.drawUnit()
      node.ship.drawUnit()
    })
  }

  return {
    planets,
    drawPlanets,
  }
}
