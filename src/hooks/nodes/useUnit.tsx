import { useEffect, useState } from "react"
import { useHomeNode } from "./useHomeNode"
import { useBuildingNodes } from "./useBuildingNodes"

export const useUnit = ({ unit: oldUnit }) => {
  const [unit, setUnit] = useState(oldUnit)
  const { homeNode } = useHomeNode()
  const { getRandomBuilding } = useBuildingNodes()

  const handleUnitArrival = () => {
    console.log(`🚀 ~ handleUnitArrival:`)
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

  const updateUnitPosition = (prev) => {
    const updatedUnit = { ...prev }
    if (!prev.target) updatedUnit.target = homeNode
    if (prev.waitingTime > 0) updatedUnit.waitingTime = prev.waitingTime - 1
    const { position, target, levels: { speed } } = updatedUnit
    const [targetX, targetY] = target.position
    const [currentX, currentY] = position
    const dx = targetX - currentX
    const dy = targetY - currentY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const newPosition = [
      currentX + (dx / distance) * speed,
      currentY + (dy / distance) * speed,
    ]
    if (distance <= speed) {
      updatedUnit.xxx = handleUnitArrival()
    } else {
      updatedUnit.position = newPosition
    }
    return updatedUnit
  }


  const updateUnit = () => {
    if (!unit.id || !homeNode.map_id) return
    setUnit(prev => {
      const updatedUnit = {
        ...prev,
        ...updateUnitPosition(prev),
      }

      return updatedUnit
    })
  }

  useEffect(() => {
    requestAnimationFrame(updateUnit)

    return () => cancelAnimationFrame(updateUnit)
  }, [updateUnit])

  return { ...unit }
}
