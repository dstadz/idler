'use client'
import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import { hexHeight, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import { buildingNodesAtom, hexCellsAtom, mapDataAtom } from '@/atoms'
import HexRow from './HexRow'
import { supabase } from '@/lib/supabase'

const HexGrid = () => {
  const [mapData] = useAtom(mapDataAtom)
  const [hexCells, setHexCells] = useAtom(hexCellsAtom)
  const [buildings, setBuildings] = useAtom(buildingNodesAtom)
  const updateHexCell = (rowIndex, colIndex, updatedCell) => {
    setHexCells(prev =>
      prev.map((row, rIdx) =>
        rIdx !== rowIndex ? row : row.map((cell, cIdx) =>
          cIdx !== colIndex ? cell : { ...cell, ...updatedCell }
        )
      )
    )
  }

  const homeNode = {
    type: 'HOME',
    status: 'active',
    level: 1,
    map_id: mapData.id,
    // ...buildingNode,
    position: [10,2],
  }
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
  useEffect(() => {
    if (!mapData.id) return

    const getBuildings = async () => {
      const { data: buildingsData, error: buildingsError } = await supabase
        .from('building_nodes')
        .select('*')
        .eq('map_id', mapData.id)
      if (buildingsError) console.log(buildingsError)
      if (!buildingsData) return
      setBuildings([
        homeNode,
        ...buildingsData.map(building => ({
          position: [building.position_x, building.position_y],
          id: building.id,
          type: building.type,
          level: building.level,
          status: building.status,
          home: homeNode,
          // resources: JSON.parse(building.resources),
        }))
      ])
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

  if (!hexCells || hexCells.length < 2) return null

  return (
    <Stack
      className='hex-grid'
      component={'section'}
      direction={'column'}
      sx={{
        border: '3px solid blue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingTop: `${hexHeight / 4}px`,
        background: tileBackgrounds.SEA
      }}
    >
      {hexCells.map((row, rowIndex) => (
        <HexRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
    </Stack>
  )
}
export default HexGrid
