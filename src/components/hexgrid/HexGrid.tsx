'use client'
import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import { hexHeight, tileBackgrounds } from '@/utils/constants'
import { useAtom } from 'jotai'
import { hexCellsAtom, mapDataAtom } from '@/atoms'
import HexRow from './HexRow'
import { supabase } from '@/lib/supabase'
import { useBuildingNodes } from '@/hooks/nodes/useBuildingNodes'
import { useHomeNode } from '@/hooks/nodes/useHomeNode'

const HexGrid = () => {
  const [mapData] = useAtom(mapDataAtom)
  const [hexCells, setHexCells] = useAtom(hexCellsAtom)
  const { homeNode, getHomeNode } = useHomeNode()
  const { buildingNodes, getBuildingNodes } = useBuildingNodes()

  const updateHexCell = (rowIndex, colIndex, updatedCell) => {
    setHexCells(prev =>
      prev.map((row, rIdx) =>
        rIdx !== rowIndex ? row : row.map((cell, cIdx) =>
          cIdx !== colIndex ? cell : { ...cell, ...updatedCell }
        )
      )
    )
  }

  useEffect(() => {
    if (!mapData.id) return
    getHomeNode(mapData.id)
    getBuildingNodes(mapData.id)
  }, [mapData])

  useEffect(() => {
    const getHexCells = async () => {
      if (!mapData || !mapData.id || !buildingNodes.length) return
      const newCells = new Array(mapData.height)
        .fill(null)
        .map(() => new Array(mapData.width).fill(null))

      await supabase
        .from('map_tiles')
        .select('*')
        .eq('map_id', mapData.id)
        .then(({ data: tilesData }) => {
          tilesData.forEach((tile: object) => {
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

      const [y, x] = homeNode.position
      const homeCell = newCells[y][x] = {
        ...newCells[y][x],
        building: { ...homeNode },
      }

      updateHexCell(homeCell)
      buildingNodes.forEach((building) => {
        const { position, ...restBuilding } = building
        const [y, x] = position
        const newCell = newCells[y][x] = {
          ...newCells[y][x],
          building: { ...restBuilding },
        }
        updateHexCell(newCell)
      })
    }
    getHexCells()
  }, [mapData, buildingNodes])

  if (!hexCells || hexCells.length < 2) return null

  return (
    <Stack
      className="hex-grid"
      component={'section'}
      direction={'column'}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: `${hexHeight / 4}px`,
        background: tileBackgrounds.SEA,
      }}
    >
      {hexCells.map((row, rowIndex) => (
        <HexRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
    </Stack>
  )
}

export default HexGrid
