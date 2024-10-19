'use client'

import React, { useState, useEffect } from 'react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { NAV_TABS } from '@/utils/constants'

export default function NavStack() {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState<number>(-1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setValue(NAV_TABS.findIndex((tab) => tab.route === pathname.split('/')[2]))
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    if (mounted) {
      router.push(`/dashboard/${NAV_TABS[newValue].route}`)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      role="navigation"
      orientation="vertical"
    >
      {NAV_TABS.map((tab, index) => {
        // const Icon = tab?.icon
        return (
          <Tab
            key={tab.route}
            label={tab.title}
            value={index}
            // {...(Icon ? { icon : <Icon /> } : {})}
            sx={{
              minWidth: 64,
              minHeight: 60,
              borderRadius: '4px',
              transition: 'background 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
              },
            }}
          />
        )
      })}
    </Tabs>
  )
}
