import { homeNodeAtom } from "@/atoms"
import { useAtom } from "jotai"

export const useHomeNode = () => {
  const [homeNode, setHomeNode] = useAtom(homeNodeAtom)

  const getHomeNode = async (mapId) => {
    if (!mapId) return

    setHomeNode({
      type: 'HOME',
      status: 'active',
      level: 1,
      map_id: mapId,
      position: [10, 2],
    })
  }

  return {
    homeNode,
    getHomeNode,
  }
}
