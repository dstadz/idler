import { hexHeight, hexWidth } from "./constants"


export const getDistanceFromTarget = (unit) => {
  const { position, target = homeNode, levels: { speed } } = unit
  const [targetX, targetY] = target.position
  const [currentX, currentY] = position

  const dx = targetX - currentX
  const dy = targetY - currentY
  const distance = Math.sqrt(dx * dx + dy * dy)

  const newPosition = [
    currentX + (dx / distance) * speed,
    currentY + (dy / distance) * speed,
  ]
  return { distance, newPosition }
}

export const convertHexPositionToPixel = (position) => {
  const [x, y] = position
  const isShifted = x % 2 === 1

  const [newY, newX] = [
    ((isShifted ? 3 : 1) / 4 * hexWidth) + (y * hexWidth),
    (hexHeight * .25) + (x * hexHeight * .75),
  ]
  return [newY, newX]
}
