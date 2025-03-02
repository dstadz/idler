import { useEffect, useMemo, useState } from 'react'
import { resourcesAtom } from '@/atoms'
import { useAtom  } from 'jotai'
import { Unit } from '@/classes';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';



export const useUnits = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  const { buildingNodes } = useBuildingNodes()
  const [units, setUnits] = useState([]);
  const unitData = useMemo(() => [
    {
      id: 'unit1',
      size: 32,
      emoji: "🦁",
      position: [100, 100],
      levels: { speed: 1, cargo: 1, dexterity: 1 },
    },
    {
      id: 'unit2',
      size: 32,
      emoji: "🐘",
      position: [500, 100],
      levels: { speed: 1, cargo: 3, dexterity: 1 },
    },
  ], [])

  const commonProps = {
    ctx,
    buildingNodes,
    targetNode: { position: [400, 400] },
  }

  useEffect(() => {
    setUnits(unitData.map(unit => new Unit({ ...unit, ...commonProps })))
  }, [unitData])


  const drawUnits = (ctx: CanvasRenderingContext2D) => {
    units.forEach(unit => unit.drawUnit(ctx))
  }

  return {
    units,
    drawUnits,
  }
}






















export const useResources = () => {
  const [resources, setMainResources] = useAtom(resourcesAtom)

  const addToMainResources = (resource: keyof ResourceRecord, amount: number) =>
    setMainResources(prev => ({
      ...prev,
      [resource]: (prev[resource] || 0) + amount,
    }))


  return {
    resources,
    addToMainResources,
  }
}
