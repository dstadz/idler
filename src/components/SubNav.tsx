'use client'
import React from 'react'
import { Stack } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SubNav = ({ subRoutes }: { subRoutes: string[] }) =>  {
  const pathname = usePathname()
  console.log(`🚀 ~ file: SubNav.tsx:9 ~ SubNav ~ pathname:`, pathname)

  return (
    <Stack flexDirection="row">
      {subRoutes.map(subRoute => (
        <Link href={`${pathname}/${subRoute}`} key={subRoute}>
          <Stack key={subRoute} className='border-2 border-purple-500'>
            {subRoute}
          </Stack>
        </Link>
      ))}
    </Stack>
  )
}

export default SubNav
