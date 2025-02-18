'use client'
import React, { ReactNode, useEffect } from 'react'
import { useAtom } from 'jotai'
import { Stack, Typography } from '@mui/material'

import { userIdAtom, hexCellsAtom, mapDataAtom, buildingNodesAtom } from '@/atoms'
import { supabase } from '@/lib/supabase'
import { tileBackgrounds } from '@/utils/constants'
import Link from 'next/link'

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
      if (mapsError) console.log(mapsError)
      if (!mapsData || mapsData.length === 0) return
      setMapData(mapsData[0])
    }

    setMap()
  }, [userId])


  ////////////// MAPS
  const [mapData, setMapData] = useAtom(mapDataAtom)
  const [, setHexCells] = useAtom(hexCellsAtom)

  const updateHexCell = (rowIndex, colIndex, updatedCell) => {
    setHexCells(prev =>
      prev.map((row, rIdx) =>
        rIdx !== rowIndex ? row : row.map((cell, cIdx) =>
          cIdx !== colIndex ? cell : { ...cell, ...updatedCell }
        )
      )
    )
  }

  const [buildings, setBuildings] = useAtom(buildingNodesAtom)

  useEffect(() => {
    if (!mapData) return

    const getBuildings = async () => {
      const { data: buildingsData, error: buildingsError } = await supabase
        .from('building_nodes')
        .select('*')
        .eq('map_id', mapData.id)
      if (buildingsError) console.log(buildingsError)
      if (!buildingsData) return
      setBuildings(buildingsData?.map(building => ({
        // ...building,
        position: [building.position_x, building.position_y],
        id: building.id,
        type: building.type,
        level: building.level,
        status: building.status,
        // resources: JSON.parse(building.resources),
      })))
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

        setHexCells(newCells)

        buildings.forEach((building) => {
          const { position, ...restBuilding } = building
          const [y, x] = position
          const newCell = newCells[y][x] = {
            ...newCells[y][x],
            building:{...restBuilding },}
          updateHexCell(newCell)
        })
    }
    getTiles()


  }, [mapData, buildings])

  // const newBuilding = {
  //   type: 'VILLAGE',
  //   status: 'active',
  //   level: 1,
  //   map_id: mapData.id,
  //   // ...buildingNode,
  //   position: [
  //     selectedTile?.position?.[0],
  //     selectedTile?.position?.[1],
  //   ],
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


  // sign in
  useEffect(() => {
    const { data, error } = supabase
    .auth
    .onAuthStateChange((event, session) => {
      setUserId(session?.user?.id)
    })
    console.log('onAuthStateChange', { data, event })

    return () => {
      supabase.auth.onAuthStateChange(null)
    }
  }, [setUserId])

  if (!userId) return <div>
    <Link href='/signin'> Sign In</Link>
    <Typography>User not logged in</Typography>
  </div>

  return (
    <Stack
      className='DashboardLayout'
      sx={styles.wrapper}
      position={'relative'}
    >
      <Stack className='top-row' sx={styles.row}>
        <Stack className='resources' sx={styles.resources}>
        <Typography>stuff: 10</Typography>
        <Typography>things: 15</Typography>
        </Stack>
        <Stack className='settings' sx={styles.statBlock}>
          <Stack sx={styles.dataButton}>
            <Typography>stats</Typography>
          </Stack>
          <Stack sx={styles.dataButton}>
            <Typography>settings</Typography>
          </Stack>
        </Stack>
      </Stack>

      {children}

      <Stack className='bot-row' sx={styles.row}>
        <Stack sx={styles.botLeft}>
          <Typography>buttons</Typography>
        </Stack>

        <Stack sx={styles.botRight}>
          <Typography>actions</Typography>
        </Stack>
      {/* <Typography>ADS give me money plz give me money</Typography> */}
      </Stack>
    </Stack>
  )
}

export default DashboardLayout

const styles = {
  wrapper: {
  flex: 1,
  border: '3px solid white',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: tileBackgrounds.SEA,
  height: '100dvh',
  width: '100dvw',
  },
  row: {
  // flex: 1,
  // position: 'absolute',
  height: '10%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderColor: 'green',
  borderWidth: 5,
  },
  resources: {
  flex: 1,
  flexDirection: 'row',
  borderColor: 'blue',
  borderWidth: 5,
  },
  canvas: {
  borderColor: 'red',
  borderWidth: 5,
  height: '100%',
  pointerEvents: 'none',
  },
  statBlock: {
  flexDirection: 'row',
  justifyContent: 'end',
  },
  dataButton: {
  borderColor: 'blue',
  borderWidth: 1,
  },
  middleRow: {
  flex: 10,
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
  // borderColor: 'blue',
  // borderWidth: 5,
  },
  botLeft: {
  borderColor: 'orange',
  borderWidth: 5,
  },
  botRight: {
  borderColor: 'pink',
  borderWidth: 5,
  },
  hexGrid: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  },
  topRow: {
  top: 0,
  left: 0,
  width: '100%',
  height: 50,
  },
  bottomRow: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: 50,
  },
}
