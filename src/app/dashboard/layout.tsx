'use client'
import React, { ReactNode, useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { Stack, Typography } from '@mui/material'
import { userIdAtom, mapDataAtom } from '@/atoms'
import { supabase } from '@/lib/supabase'
import { tileBackgrounds } from '@/utils/constants'
import Link from 'next/link'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useAtom(userIdAtom)
  const setMapData = useSetAtom(mapDataAtom)
  useEffect(() => {
    if (!userId) return
    const setMap = async () => {
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
  useEffect(() => {
    // const { data, error } =
    supabase
    .auth
    .onAuthStateChange((event, session) => {
      setUserId(session?.user?.id)
    })

    return () => {
      supabase.auth.onAuthStateChange(null)
    }
  }, [setUserId])

  if (!userId) return (
    <div>
      <Link href='/signin'> Sign In</Link>
      <Typography>User not logged in</Typography>
    </div>
  )

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

      <Stack className='page-wrapper' sx={styles.pageWrapper}>
        {children}
      </Stack>

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
  // borderColor: 'green',
  // borderWidth: 5,
  zIndex: 2,
  },
  resources: {
  flex: 1,
  flexDirection: 'row',
  // borderColor: 'blue',
  // borderWidth: 5,
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
  // borderColor: 'blue',
  // borderWidth: 1,
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

  pageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    // zIndex: -1,
  },
}
