

export const getDistanceFromTarget = (unit) => {
  const { position, target = homeNode } = unit
  const [targetX, targetY] = target.position
  const [currentX, currentY] = position

  const dx = targetX - currentX
  const dy = targetY - currentY
  const distance = Math.sqrt(dx * dx + dy * dy)
  return distance
}
