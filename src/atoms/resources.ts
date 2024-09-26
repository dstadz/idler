import { RESOURCES } from '@/utils/contants'
import { atom } from 'jotai'

type ResourceRecord = keyof typeof RESOURCES
const resourceAmounts: Record<ResourceRecord, number> = Object.keys(RESOURCES)
.reduce((acc, key) => {
  acc[key as ResourceRecord] = 0
  return acc
}, {} as Record<ResourceRecord, number>)

export const resourcesAtom = atom(resourceAmounts)
