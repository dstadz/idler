'use client'
import React from 'react'
import { useAtom } from 'jotai'
import { Stack, Typography } from '@mui/material'

import { LayoutProps } from '@/interfaces'
import { resourcesAtom } from '@/atoms'
import { getResourceList } from '@/utils/constants'
import SubNav from '@/components/SubNav'

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
