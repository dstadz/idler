'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Stack } from '@mui/material'

import { moneyAtom, userAtom, userIdAtom, hexCellsAtom, selectedTileAtom, mapDataAtom, buildingNodesAtom } from '@/atoms'
import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import Header from '@/components/Header'
import Button from '@/components/UI/Button'
import HexGrid from '@/components/hexgrid/HexGrid'

import { BUILDING_KEYS, BUILDING_OBJECTS, RESOURCES, TILE_OBJECTS_KEYS } from '@/utils/constants'
import { supabase } from '@/lib/supabase'
import { saveBuildingSupabase } from '../api/nodes/route'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useAtom(userIdAtom)


  useEffect(() => {
    if (!userId) return
    const setMap = async () => {
      if (!userId) return
      const { data: mapsData, error: mapsError } = await supabase
        .from('maps')
        .select('*')
        .eq('id', "d042e825-a92b-49ff-9cd2-a80e0d1d71e2")
      setMapData(mapsData[0])
    }

    setMap()
  }, [userId])





  ////////////// MAPS
  const [mapData, setMapData] = useAtom(mapDataAtom)
  const [hexCells, setHexCells] = useAtom(hexCellsAtom)
  const updateHexCell = (newCell) => {
    console.log(`🚀 ~ file: layout.tsx:44 ~ updateHexCell ~ newCell:`, newCell)
    const [rowIndex, colIndex] = newCell.position
    setHexCells(prev =>
        prev.map((row, rIdx) =>
          rIdx !== rowIndex ? row : row.map((cell, cIdx) =>
            cIdx !== colIndex ? cell : { ...cell, ...newCell }
          )
        )
      )
  }
  const [selectedTile, setSelectedTile] = useAtom(selectedTileAtom)
  const [buildings, setBuildings] = useAtom(buildingNodesAtom)

  useEffect(() => {
    if (!mapData) return

    const getBuildings = async () => {
      const { data: buildingsData, error: buildingsError } = await supabase
        .from('building_nodes')
        .select('*')
        .eq('map_id', mapData.id)
      console.log(`🚀  ~ buildingsData:`, buildingsData)
      setBuildings(buildingsData)
    }
    getBuildings()
  }, [mapData])

  useEffect(() => {

    const getTiles = async () => {
      if (!mapData || !mapData.id || !buildings) return

      const newCells = new Array(mapData.height).fill(null).map(() => new Array(mapData.width).fill(null))

      console.log(`🚀 ~ file: layout.tsx:97 ~ getTiles ~ mapData:`, mapData)
      await supabase
        .from('map_tiles')
        .select('*')
        .eq('map_id', mapData.id)
        .then(({ data: tilesData }) => {
          console.log(tilesData)
          tilesData.forEach((tile: any) => {
            newCells[tile.position_y][tile.position_x] = {
              id: tile.id,
              type: tile.type,
              level: tile.level,
              status: tile.status,
              // resoures: tile.resources,
            }
          })
        })
        .catch(err => console.log(err))
      setHexCells(newCells)
    }
    getTiles()


  }, [mapData, buildings])

  useEffect(() => {
    if (!mapData) return
  }, [mapData])




  // useEffect(() => {
  //   if (hexCells.length  < 2) return
  //   console.log(`🚀 ~ file: layout.tsx:73 ~ useEffect ~ hexCells:`, hexCells)
  //   buildingNodes.forEach(node => {
  //     hexCells[node.position[0]][node.position[1]].buildingId = BUILDING_OBJECTS[node.type].EMOJI
  //   })
  // },[hexCells])

  const newBuilding = {
    type: 'VILLAGE',
    status: 'active',
    level: 1,
    map_id: mapData.id,
    // ...buildingNode,
    position: [
      selectedTile?.position?.[0],
      selectedTile?.position?.[1],
    ],
  }
  const addBuilding = async () => {
    console.log(mapData.id)
    console.log(`🚀 ~ file: layout.tsx:130 ~ addBuilding ~ newBuilding:`, newBuilding)
    setBuildings(prev => [...prev, newBuilding])
    updateHexCell({
      ...selectedTile,
      newBuilding,
    })

    const {
      buildingsData,
      buildingsError
    } = await saveBuildingSupabase(newBuilding)
    console.log({ buildingsData, buildingsError })
  }


  // sign in
  useEffect(() => {
    const { data, error } = supabase
    .auth
    .onAuthStateChange((event, session) => {
      setUserId(session?.user?.id)
    })

    return () => {
      supabase.auth.onAuthStateChange(null)
    }
  }, [setUserId])


  if (!userId) return <div>User not logged in</div>

  const clickCell = (cell) => {
    const { id } = cell
    console.log(cell)
    const [rowIndex, colIndex] = id.split('-').map(Number)
    // setActiveCell(rowIndex, colIndex)
    setSelectedTile(cell)
    addBuilding()
    // const
    //
  }

  return (
    <Stack style={{ width: '100%', height: '100%' }} flexDirection='row'>
      <NavStack />
      <Stack flexDirection="column" sx={{ border: '5px solid green' }}>
        <Header />
        {children}
        <Button onClick={() => saveMap()}>Save Map</Button>
        <Button onClick={() => addBuilding()}>Add Building</Button>

        <Stack sx={{ border: '3px solid blue', position: 'relative' }}>
          <Canvas canvasHeight={500} canvasWidth={750} />
          <HexGrid clickCell={clickCell} />
        </Stack>

      </Stack>
    </Stack>
  )
}

export default DashboardLayout
