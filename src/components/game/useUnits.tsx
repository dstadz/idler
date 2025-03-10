import { useCallback, useEffect } from "react"
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

  useEffect(() => {
    if (!buildingNodes || !homeNode) return
    const initialUnits = unitData.map((node) => ({
      id: node.id,
      position: node.position,
      size: node.size,
      emoji: node.emoji,
      levels: node.levels,
      inventory: [{ name: 'wood', quantity: 3 }],
      waitingTime: 0,
    }))
    setUnits(initialUnits)

    return () => {
      setUnits([])
    }
  }, [buildingNodes, homeNode])


  // const getPriorityTargetNode = unit => {
  //   const target = [ 400, 400]
  //   return { target }
  // }

  // const startLoading = unit => {
  //   console.log(`🚀 ~  ~ startLoading:`, unit)
  //   const loadingTime = 1000 / unit.levels.dexterity
  //   // const availableResourceList = Object.keys(unit.target.inventory)
  //   //   .filter(key => unit.target.inventory[key as keyof ResourceRecord] > 1)

  //   // if (availableResourceList.length === 0) {
  //   //     unit.isLoading = false
  //   //     return
  //   // }

  //   // const ranIdx = Math.floor(Math.random() * availableResourceList.length)
  //   // const resource = availableResourceList[ranIdx] as keyof ResourceRecord

  //   // setTimeout(() => {
  //       // if (!unit.inventory || !unit.target.inventory || !(resource in unit.target.inventory)) return

  //       // const availableAmount = unit.target.inventory[resource] || 0
  //       // const transferAmount = Math.min(Math.floor(availableAmount), unit.levels.cargo)

  //       // unit.inventory[resource] = (unit.inventory[resource] || 0) + transferAmount
  //       // unit.target.inventory[resource] -= transferAmount
  //       // unit.target = unit.homeNode
  //       return unit
  //   // }, loadingTime)
  // }



  const getRandomBuilding = () => {
    if (!buildingNodes.length) return homeNode
    const node = buildingNodes[Math.floor(Math.random() * buildingNodes.length)]
    return { ...node, position: convertHexPositionToPixel(node.position) }
  }

  const handleUnitArrival = (unitOld) => {
    const unit = { ...unitOld }
    if (!unit.target) return unit

    unit.waitingTime = 10 - unit.levels.dexterity

    if (unit.target === homeNode) {
      unit.inventory = []
      unit.target = getRandomBuilding()
    } else {
      unit.target = homeNode
      unit.inventory = [{ name: 'wood', quantity: 1 }] // Always picks up 1 wood
    }
    return unit
  }

  const updateUnitPosition = (unit) => {
    if (unit.waitingTime) return { ...unit, waitingTime: unit.waitingTime - 1 }
    if (!unit.target) return { ...unit, target: homeNode }


    const { speed, dexterity } = unit.levels
    const { distance, newPosition } = getDistanceFromTarget(unit)

    if (distance <= speed) {
      setTimeout(() => setUnits((prevUnits) =>
        prevUnits.map((u) => u.id === unit.id ? handleUnitArrival(unit) : u)
      ), 3000 / dexterity)

      return { ...unit }
    }


    return { ...unit, position: newPosition }
  }

  const updateUnitsPositions = useCallback(() => {
    if (!units.length || !buildingNodes || !homeNode.map_id) return
    setUnits(u => u.map(updateUnitPosition))
  }, [units, buildingNodes, homeNode])

  return {
    units,
    updateUnitsPositions,
  }
}
