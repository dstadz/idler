import { RESOURCES } from '@/utils/contants'
import { atom } from 'jotai'

const resourceAmounts = {}
for (const resource in RESOURCES) {
  resourceAmounts[resource] = 0
}

export const resourcesAtom = atom(resourceAmounts)
