'use client'

import React, { ReactNode, useEffect } from 'react'
import { useAtom } from 'jotai'
import { Stack } from '@mui/material'

import { mapTileMatrixAtom, moneyAtom, userAtom, userIdAtom } from '@/atoms'
import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import Button from '@/components/UI/Button'
import { blankHexCells } from '@/components/canvas/hexgridHelpers'

import { BUILDING_KEYS, BUILDING_OBJECTS, RESOURCES, TILE_OBJECTS_KEYS } from '@/utils/constants'
import { supabase } from '@/lib/supabase'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [money] = useAtom(moneyAtom)
  const [user, setUser] = useAtom(userAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  console.log(`🚀 ~ file: layout.tsx:21 ~ DashboardLayout ~ userId:`, userId)

  const [hexGrid, setHexGrid] = useAtom(mapTileMatrixAtom)
  useEffect(() => {
    setHexGrid(
      blankHexCells(12, 12)
      .map(row => row.map(cell => ({
        ...cell,
        type: TILE_OBJECTS_KEYS[Math.floor(Math.random() * TILE_OBJECTS_KEYS.length)]
      })))
    )

  }, [])

  const buildingNodes = [
    {
      id: 1,
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

  useEffect(() => {
    if (hexGrid.length  < 2) return
    buildingNodes.forEach(node => {
      hexGrid[node.position[0]][node.position[1]].buildingEmoji = BUILDING_OBJECTS[node.type].EMOJI
    })
  },[hexGrid])




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

  if (!userId) {
    return <div>User not logged in</div>
}

  return (
    <Stack style={{ width: '100%', height: '100%' }} flexDirection='row'>
      <NavStack />
      <Stack flexDirection="column" sx={{ border: '5px solid green' }}>
        <Header money={money} user={user} />
        {children}
        <Button onClick={() => console.log('Build')}>Save Map</Button>

        <Canvas />
      </Stack>
    </Stack>
  )
}

export default DashboardLayout

const Header = ({ money, user }: { money: number; user: any}) => (
  <Stack flexDirection="row" sx={{ border: '3px solid blue' }}>
    {user && <h1>{user.name}s Dashboard</h1>}
  ${money}
    <SignOutButton />
  </Stack>
)
