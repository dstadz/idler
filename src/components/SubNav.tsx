'use client'
import React from 'react'
import { Stack } from '@mui/material'
import Link from 'next/link'

const SubNav = ({ subRoutes }: { subRoutes: string[] }) => {
  return (
    <Stack flexDirection="row">
      {subRoutes.map(subRoute => (
        <Link href={`/dashboard/resources/${subRoute}`} key={subRoute}>
          <Stack key={subRoute} className='border-2 border-purple-500'>
            {subRoute}
          </Stack>
        </Link>
      ))}
    </Stack>
  )
}

export default SubNav
