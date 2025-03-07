'use client'
import React, { ReactNode, useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'
import { Stack, Typography } from '@mui/material'
import { userIdAtom, mapDataAtom } from '@/atoms'
import { supabase } from '@/lib/supabase'
import { tileBackgrounds } from '@/utils/constants'
import Link from 'next/link'
import TopRow from '@/components/UI/TopRow'
import { styles } from '@/utils/styles'

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
      <TopRow />

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
