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

  const updateHexCell = (rowIndex, colIndex, updatedCell) => {
    setHexCells(prev =>
      prev.map((row, rIdx) =>
        rIdx !== rowIndex ? row : row.map((cell, cIdx) =>
          cIdx !== colIndex ? cell : { ...cell, ...updatedCell }
        )
      )
    )
  }
  const [selectedTile, setSelectedTile] = useAtom(selectedTileAtom)
  const clickCell = (cell) => {
    console.log(`🚀 ~ file: layout.tsx:56 ~ clickCell ~ cell:`, cell)
    const { id } = cell
    console.log(cell)
    // setActiveCell(rowIndex, colIndex)
    setSelectedTile(cell)
    // addBuilding()
    // const
    //
  }
  const [buildings, setBuildings] = useAtom(buildingNodesAtom)

  useEffect(() => {
    if (!mapData) return

    const getBuildings = async () => {
      const { data: buildingsData, error: buildingsError } = await supabase
        .from('building_nodes')
        .select('*')
        .eq('map_id', mapData.id)
      setBuildings(buildingsData)
    }
    getBuildings()
  }, [mapData])

  useEffect(() => {

    const getTiles = async () => {
      if (!mapData || !mapData.id || !buildings) return

      const newCells = new Array(mapData.height).fill(null)
        .map(() => new Array(mapData.width).fill(null))

      await supabase
        .from('map_tiles')
        .select('*')
        .eq('map_id', mapData.id)
        .then(({ data: tilesData }) => {
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

        console.log({ buildings, newCells })
        setHexCells(newCells)

        buildings.forEach((building: any) => {
          console.log(`🚀 ~  building:`, building)
          const { position_x, position_y, created_at, map_id, user_id, ...restBuilding } = building // {...}
          const oldCell = newCells[position_y][position_x]
          console.log(`🚀 ~ file: layout.tsx:118 ~ buildings.forEach ~ oldCell:`, oldCell)
          const newCell = newCells[position_y][position_x] = {
            ...newCells[position_y][position_x],
            building:{...restBuilding },}
          console.log(`🚀 ~ file: layout.tsx:114 ~ buildings.forEach ~ newCell:`, newCell)
          updateHexCell(newCell)
        })
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
    setBuildings(prev => [...prev, {...restBuilding, position: [position_x, position_y] }])
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
