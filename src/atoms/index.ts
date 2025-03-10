import { atom } from 'jotai'

export const userAtom = atom(null)
export const userIdAtom = atom('')

export const selectedTileAtom = atom({})
export const selectedTilesAtom = atom([])
export const hexCellsAtom = atom([[]])
export const mapDataAtom = atom({})

export const unitNodesAtom = atom([])
export const homeNodeAtom = atom({})
export const buildingNodesAtom = atom([])
export const resourcesAtom = atom({})

export const moneyAtom = atom(1000)
