import { ResourceKey, ResourceRecord } from '@/types/node'
import { RESOURCES } from '@/utils/constants'
import { atom } from 'jotai'

const resourceAmounts: ResourceRecord = Object.keys(RESOURCES)
.reduce((acc, key) => {
  acc[key as ResourceKey] = 0
  return acc
}, {} as ResourceRecord)

export const resourcesAtom = atom(resourceAmounts)

export const moneyAtom = atom(1000)
