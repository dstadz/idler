import React from 'react'
// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'
import { Stack } from '@mui/material'
import Canvas from '@/components/canvas/Canvas'
import HexGrid from '@/components/hexgrid/HexGrid'
import Gamefield from '@/components/game/Gamefield'
import MoveButton from '@/components/MoveButton'

export default async function Page() {
  // const cookieStore = await cookies()
  // const supabase = createClient(cookieStore)

  // const data = await supabase.from('users').select('*')
  // console.log(`🚀 ~ Page ~ data:`, data)

  return (
    <Stack className="map-wrapper" sx={styles.wrapper}>
      {/* <Canvas canvasHeight={475} canvasWidth={750} /> */}
      <Gamefield />
      <HexGrid />
      <MoveButton />
    </Stack>
  )
}

const styles = {
  wrapper: {
    flex: 1,
    // overflow: 'hidden',
    // height: '100dvh',
    // width: '100%',
  },
}
