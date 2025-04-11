import { useCallback, useEffect, useRef } from "react"
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes'
import { useHomeNode } from "@/hooks/nodes/useHomeNode"
import { convertHexPositionToPixel, getDistanceFromTarget } from "@/utils/gameHelpers"
import { useAtom } from "jotai"
import { unitNodesAtom } from "@/atoms"
import { unitData } from "@/utils/constants"

export const useUnits = () => {
  const { homeNode } = useHomeNode()
  const { buildingNodes } = useBuildingNodes()
  const [units, setUnits] = useAtom(unitNodesAtom)
  const unitsRef = useRef(units)
  useEffect(() => {
    unitsRef.current = units
  }, [units])

  useEffect(() => {
    if (!buildingNodes || !homeNode) return
    const initialUnits = unitData.map((node) => ({
      id: node.id,
      position: node.position,
      size: node.size,
      emoji: node.emoji,
      levels: node.levels,
      inventory: [{ name: 'wood', quantity: 3 }],
    }))
    setUnits(initialUnits)

    return () => {
      setUnits([])
    }
  }, [buildingNodes, homeNode])

  const getRandomBuilding = () => {
    if (!buildingNodes.length) return homeNode
    const node = buildingNodes[Math.floor(Math.random() * buildingNodes.length)]
    return { ...node, position: convertHexPositionToPixel(node.position) }
  }

  const handleUnitArrival = (unitOld) => {
    const unit = { ...unitOld }
    if (!unit.target) return unit

    if (unit.target === homeNode) {
      unit.inventory = []
      unit.target = getRandomBuilding()
    } else {
      unit.target = homeNode
      unit.inventory = [{ name: 'wood', quantity: 1 }]
    }
    return unit
  }

  const updateUnitPosition = (unit) => {
    if (!unit.target) return { ...unit, target: homeNode }

    const { speed, dexterity } = unit.levels
    const { distance, newPosition } = getDistanceFromTarget(unit)

    if (distance <= speed) {
      const timeoutId = setTimeout(() => {
        setUnits(prevUnits =>
          prevUnits.map(u => u.id === unit.id ? handleUnitArrival(unit) : u)
        )
      }, 3000 / dexterity)

      // Store the timeout ID in the unit object instead of returning the cleanup function
      return { ...unit, timeoutId }
    }

    return { ...unit, position: newPosition }
  }

  const updateUnitsPositions = useCallback(() => {
    if (!unitsRef.current.length || !buildingNodes || !homeNode.map_id) return

    const updatedUnits = unitsRef.current.map(updateUnitPosition)
    setUnits(updatedUnits)
  }, [buildingNodes, homeNode])

  // Clean up any pending timeouts when component unmounts
  useEffect(() => {
    return () => {
      unitsRef.current.forEach(unit => {
        if (unit.timeoutId) {
          clearTimeout(unit.timeoutId)
        }
      })
    }
  }, [])

  return {
    units,
    updateUnitsPositions,
  }
}
