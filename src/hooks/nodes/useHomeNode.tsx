import { homeNodeAtom, mapDataAtom } from "@/atoms"
import { convertHexPositionToPixel } from "@/utils/gameHelpers"
import { useAtom, useAtomValue } from "jotai"
import { useEffect } from "react"

export const useHomeNode = () => {
  const [homeNode, setHomeNode] = useAtom(homeNodeAtom)
  const mapData = useAtomValue(mapDataAtom)

  const getHomeNode = async (mapId) => {
    if (!mapId) return

    setHomeNode({
      type: 'HOME',
      status: 'active',
      level: 1,
      map_id: mapId,
      tile: [10, 2],
      position: convertHexPositionToPixel([10, 2]),
    })
  }

  useEffect(() => {
    if (!mapData.id) return
    getHomeNode(mapData.id)
  }, [mapData])

  return { homeNode }
}
