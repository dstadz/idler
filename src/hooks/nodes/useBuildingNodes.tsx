import { useCallback, useEffect } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { buildingNodesAtom, mapDataAtom } from '@/atoms'
import { supabase } from '@/lib/supabase'

export const useBuildingNodes = () => {
  const mapData = useAtomValue(mapDataAtom)

  const [buildingNodes, setBuildingNodes] = useAtom(buildingNodesAtom)

  const getBuildingNodes = useCallback(async (mapId) => {
    const { data: buildingNodesData, error: buildingNodesError } = await supabase
      .from('building_nodes')
      .select('*')
      .eq('map_id', mapId)
    if (buildingNodesError) console.log(buildingNodesError)
    if (!buildingNodesData) return
    setBuildingNodes([
      ...buildingNodesData.map((building) => ({
        position: [building.position_x, building.position_y],
        id: building.id,
        type: building.type,
        level: building.level,
        status: building.status,
        // resources: JSON.parse(building.resources),
      })),
    ])
  }, [mapData])

  useEffect(() => {
    if (!mapData) return
      getBuildingNodes(mapData.id)
    }, [mapData])

  return { buildingNodes }
}
  // useEffect(() => {
  //   if (!ctx) return
  //   (async () => {
  //     const fetchedData = await getNodes()
  //     if (fetchedData) {
  //       const newBuildingNodes = mapDbToCanvasNode(fetchedData, ctx)
  //       setBuildingNodes(newBuildingNodes)
  //     }
  //   })()
  // }, [ctx])

  // const drawBuildingNodes = useCallback(() => {
  //   if (buildingNodes instanceof CanvasNode) {
  //     buildingNodes.drawUnit()
  //   }
  // }, [buildingNodes])

  // const createBuildingNode = async () => {
  //   const newNodeData = await createNode({ body: { name: 'Home Node', type: 'buildingNodes' } })
  //   setBuildingNodes(newNodeData)
  // }

  // return {
    // buildingNodes,
    // homeResources,
    // drawBuildingNodes,
    // createBuildingNode,
//   }
// }

  // const addBuilding = async () => {
  //   setBuildings(prev => [
  //     ...prev,
  //     {...newBuilding },
  //   ])
  //   updateHexCell({
  //     ...selectedTile,
  //     newBuilding,
  //   })

  //   const {
  //     buildingsData,
  //     buildingsError
  //   } = await saveBuildingSupabase(newBuilding)
  //   console.log({ buildingsData, buildingsError })
  // }
