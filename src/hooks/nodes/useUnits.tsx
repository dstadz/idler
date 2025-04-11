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

    // Add a small delay before changing target to prevent visual jitter
    const arrivalDelay = 100 // ms

    setTimeout(() => {
      if (unit.target === homeNode) {
        unit.inventory = []
        unit.target = getRandomBuilding()
      } else {
        unit.target = homeNode
        unit.inventory = [{ name: 'wood', quantity: 1 }]
      }
      setUnits(prevUnits =>
        prevUnits.map(u => u.id === unit.id ? unit : u)
      )
    }, arrivalDelay)

    return { ...unit, isArriving: true }
  }

  const updateUnitPosition = (unit) => {
    if (!unit.target) return { ...unit, target: homeNode }

    const { speed, dexterity } = unit.levels
    const { distance, newPosition } = getDistanceFromTarget(unit)

    if (distance <= speed) {
      // If we're already in the arrival process, don't start another one
      if (unit.isArriving) return unit

      const loadingTime = 3000 / dexterity
      const startTime = Date.now()

      const timeoutId = setTimeout(() => {
        setUnits(prevUnits =>
          prevUnits.map(u => u.id === unit.id ? handleUnitArrival(unit) : u)
        )
      }, loadingTime)

      // Use requestAnimationFrame for smoother animation
      let animationFrameId
      const animateProgress = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(100, (elapsed / loadingTime) * 100)

        setUnits(prevUnits =>
          prevUnits.map(u =>
            u.id === unit.id
              ? { ...u, loadingProgress: progress, isLoading: true, isArriving: true }
              : u
          )
        )

        if (progress < 100) {
          animationFrameId = requestAnimationFrame(animateProgress)
        }
      }

      animationFrameId = requestAnimationFrame(animateProgress)

      return {
        ...unit,
        timeoutId,
        loadingProgress: 0,
        isLoading: true,
        isArriving: true,
        animationFrameId
      }
    }

    return {
      ...unit,
      position: newPosition,
      loadingProgress: 0,
      isLoading: false,
      isArriving: false
    }
  }

  const updateUnitsPositions = useCallback(() => {
    if (!unitsRef.current.length || !buildingNodes || !homeNode.map_id) return

    const updatedUnits = unitsRef.current.map(updateUnitPosition)
    setUnits(updatedUnits)
  }, [buildingNodes, homeNode])

  // Clean up any pending timeouts and animation frames when component unmounts
  useEffect(() => {
    return () => {
      unitsRef.current.forEach(unit => {
        if (unit.timeoutId) {
          clearTimeout(unit.timeoutId)
        }
        if (unit.animationFrameId) {
          cancelAnimationFrame(unit.animationFrameId)
        }
      })
    }
  }, [])

  return {
    units,
    updateUnitsPositions,
  }
}
