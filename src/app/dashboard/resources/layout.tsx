'use client'
import React from 'react'
import { LayoutProps } from '@/interfaces'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { getResourceList } from '@/utils/constants'

import { resourcesAtom } from '@/atoms'
import { useAtom } from 'jotai'

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

const ResourcesLayout = ({ children }: LayoutProps) => {
  const [mainResources] = useAtom(resourcesAtom)

  return (
  <div className='flex flex-col border-2 w-full border-4 border-purple-500'>
    Resource Layout
    <SubNav subRoutes={['ores', 'refined', 'items']} />
    {children}
    <Stack>

    <Typography>
        {Object.keys(mainResources).length > 0 ? (
          getResourceList({ resourceObject: mainResources })
            .map(resource => <div key={resource}>{resource}</div>)
        ) : 'No resources available'}
      </Typography>
    </Stack>
  </div>
)}

export default ResourcesLayout
