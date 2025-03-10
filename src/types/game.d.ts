export type Unit = {
  id: string
  position: number[]
  size: number
  emoji: string
  levels: {
    speed: number
    dexterity: number
  }
  inventory: {
    name: string
    quantity: number
  }[]
  waitingTime: number
}
