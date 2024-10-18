import { Planet } from '@/classes'
import { useEffect, useState } from 'react'
import { UsePlanetProps } from '@/interfaces'
import { PLANETS as planetsStatic } from '@/utils/constants'



const PLANETS = planetsStatic.map(planet => ({
  ...planet,
  levels: {
    mineRate: 1,
    shipSpeed: 1,
    cargo: 1,
  },
  position: [500, 100],
}))

export const usePlanets = ({
  ctx,
  homeNode,
}: UsePlanetProps) => {
  const [planets, setPlanets] = useState<Planet[]>([])

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
      }))
    setPlanets(newPlanets)
  }, [ctx, homeNode])

  const drawPlanets = () => {
    planets.forEach(node => node.drawUnit())
  }

  return {
    planets,
    drawPlanets,
  }
}
