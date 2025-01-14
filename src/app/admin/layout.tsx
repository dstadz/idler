'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Stack } from '@mui/material'

import { moneyAtom, userAtom, userIdAtom, hexCellsAtom, selectedTileAtom } from '@/atoms'
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
  const [money] = useAtom(moneyAtom)
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [mapData, setMapData] = useState(null)
  const [buildings, setBuildings] = useState([])

  const [hexCells, setHexCells] = useAtom(hexCellsAtom)
  const updateHexCell = (newCell) => {
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

  useEffect(() => {
    if (!mapData) return

    const getBuildings = async () => {
      const { data: buildingsData, error: buildingsError } = await supabase
        .from('building_nodes')
        .select('*')
        .eq('user_id', userId)
      // console.log(`🚀  ~ buildingsData:`, buildingsData[0].tile_.id)
      setBuildings(buildingsData)
    }
    getBuildings()
  }, [mapData])

  useEffect(() => {

    const getTiles = async () => {
      if (!mapData || !buildings) return

      const newCells = new Array(mapData.height).fill(null).map(() => new Array(mapData.width).fill(null))

      const { data: tilesData, error: tilesError } = await supabase
        .from('map_tiles')
        .select('*')
        .eq('map_id', mapData.id)
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


  const addBuilding = async () => {
    console.log('addBuilding')
    console.log(`🚀 ~ fil ~ newBuilding.selectedTile:`, selectedTile)
    const newBuilding = {
      type: 'VILLAGE',
      status: 'active',
      level: 1,

      // ...buildingNode,
      position: [
        selectedTile.position[0],
        selectedTile.position[1],
      ],
    }

    console.log(`🚀 ~ file: layout.tsx:130 ~ addBuilding ~ newBuildings:`, newBuilding)
    setBuildings(prev => [...prev, newBuilding])
    updateHexCell({
      ...selectedTile,
      // buildingId: BUILDING_OBJECTS[buildingNode.type].emoji
    })

    const {
      buildingsData,
      buildingsError
    } = await saveBuildingSupabase(newBuilding)
    console.log({ buildingsData, buildingsError })
  }

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

  useEffect(() => {
    if (!userId) return
    const fetchData = async () => {
      const { data: users, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)

      if (dbError) {
        console.error("Database error:", dbError)
      } else {
        setUser(users[0])
      }
    }
    fetchData()
  }, [userId, supabase])

  if (!userId) return <div>User not logged in</div>

  const clickCell = (cell) => {
    const { id } = cell
    console.log(cell)
    const [rowIndex, colIndex] = id.split('-').map(Number)
    // setActiveCell(rowIndex, colIndex)
    setSelectedTile(cell)
    // addBuilding()
    // const
    //
  }

  return (
    <Stack style={{ width: '100%', height: '100%' }} flexDirection='row'>
      <NavStack />
      <Stack flexDirection="column" sx={{ border: '5px solid green' }}>
        <Header money={money} user={user} />
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
