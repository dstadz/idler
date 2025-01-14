'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Stack } from '@mui/material'

import { moneyAtom, userAtom, userIdAtom, hexCellsAtom } from '@/atoms'
import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import Header from '@/components/Header'
import Button from '@/components/UI/Button'

import { BUILDING_KEYS, BUILDING_OBJECTS, RESOURCES, TILE_OBJECTS_KEYS } from '@/utils/constants'
import { supabase } from '@/lib/supabase'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [money] = useAtom(moneyAtom)
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [mapData, setMapData] = useState(null)
  const [hexCells, setHexCells] = useAtom(hexCellsAtom)
  const [buildings, setBuildings] = useState([])
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

    const getTiles = async () => {
      const newCells = new Array(mapData.height).fill(null).map(() => new Array(mapData.width).fill(null))
      const { data: tilesData, error: tilesError } = await supabase
        .from('map_tiles')
        .select('*')
        .eq('map_id', mapData.id)
      console.log(tilesData)
      const newBuildings = []
      tilesData.forEach((tile: any) => {
        if (tile.building_id) {
          newBuildings.push(tile.building_id)
        }
        newCells[tile.position_y][tile.position_x] = {
          id: tile.id,
          isLocked: tile.is_locked,
          isRevealed: tile.is_revealed,

          position: [tile.position_x, tile.position_y],
          type: tile.type,
          level: tile.level,
          status: tile.status,
          buildingId: tile.building_id,
        }
      })
      console.log(`🚀 ~ file: layout.tsx:56 ~ getTiles ~ newCells:`, newCells)
      setHexCells(newCells)
    }
    getTiles()
  }, [mapData])


  const buildingNodes = [
    {
      // id: 1,
      type: 'VILLAGE',
      position: [4, 7],
      status: 'active',
      level: 1,
      emoji: '🏠',
      resources: {
        [RESOURCES.WOOD.NAME]: 10,
        [RESOURCES.FOOD.NAME]: 10,
        [RESOURCES.STONE.NAME]: 10,
      },
    },
  ]

  // useEffect(() => {
  //   if (hexCells.length  < 2) return
  //   console.log(`🚀 ~ file: layout.tsx:73 ~ useEffect ~ hexCells:`, hexCells)
  //   buildingNodes.forEach(node => {
  //     hexCells[node.position[0]][node.position[1]].buildingId = BUILDING_OBJECTS[node.type].EMOJI
  //   })
  // },[hexCells])


  const saveMap = async () => {
    console.log('Saving map...')
    const { data: mapsData , error: mapsError } = await supabase
      .from('maps')
      .insert([{
        user_id: userId,
        // name
        height: hexCells.length,
        width: hexCells[0].length
      }])
      .select('*')
      console.log({ mapsData, mapsError })

      const newTiles = []
      hexCells.forEach((row, rowIndex) => {
        row.forEach( async(cell, cellIndex) => {
          const cellDBbody = {
            ...cell,
            map_id: mapsData[0].id,
            position_x: cellIndex,
            position_y: rowIndex,
          }
          newTiles.push(cellDBbody)
        })
      })
      const { data: tilesData, error: tilesError } = await supabase
      .from('map_tiles').insert(newTiles)
      console.log(`🚀 :`, tilesData, tilesError)
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

  const toggleCell = (id: number) => {
    const [rowIndex, colIndex] = id.split('-').map(Number)
    setHexCells(prev =>
      prev.map((row, rIdx) =>
        rIdx !== rowIndex ? row : row.map((cell, cIdx) =>
          cIdx !== colIndex ? cell : { ...cell, isActive: !cell.isActive }
        )
      )
    )
  }
  
  return (
    <Stack style={{ width: '100%', height: '100%' }} flexDirection='row'>
      <NavStack />
      <Stack flexDirection="column" sx={{ border: '5px solid green' }}>
        <Header money={money} user={user} />
        {children}
        <Button onClick={() => saveMap()}>Save Map</Button>

        <Canvas canvasHeight={500} canvasWidth={750} />
      </Stack>
    </Stack>
  )
}

export default DashboardLayout
