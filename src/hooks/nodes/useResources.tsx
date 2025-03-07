import { useAtom } from 'jotai'
import { resourcesAtom } from '@/atoms'
import { ResourceRecord } from '@/types'

export const useResources = () => {
  const [resources, setMainResources] = useAtom(resourcesAtom)

  const addToMainResources = (resource: keyof ResourceRecord, amount: number) =>
    setMainResources(prev => ({
      ...prev,
      [resource]: (prev[resource] || 0) + amount,
    }))


  return {
    resources,
    resourceList: Object.keys(resources),
    addToMainResources,
  }
}
