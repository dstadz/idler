import { useCallback, useEffect, useState } from 'react'
import { Unit } from '@/classes';
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes';


export const unitData = [
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
]
export const useUnits = ({ ctx }: { ctx: CanvasRenderingContext2D }) => {
  const { buildingNodes } = useBuildingNodes()
  const commonProps = {
    ctx,
    buildingNodes,
  }

  const [units, setUnits] = useState([]);
  useEffect(() => {
    if (!buildingNodes) return

    setUnits(unitData.map(unit => new Unit({ ...unit, ...commonProps })))
  }, [buildingNodes])

  const drawUnits = useCallback((ctx: CanvasRenderingContext2D) => {
    // unitData.forEach(unit => unit.drawUnit(ctx))
  },
  [unitData])

  return {
    units,
    drawUnits,
  }
}
