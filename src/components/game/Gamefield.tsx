'use client'
import React, { useEffect, useState } from 'react'
import { Unit } from './Unit'
import { Box } from '@mui/material'
import { useUnits, } from '@/hooks/nodes/useUnits'
import { resourcesAtom } from '@/atoms'
import { useAtom } from 'jotai'

const newres = [
  {
    id: 'res1',
    type: 'gold',
    amount: 100,
    position: [300, 300]
  }
]
const useResources = () => {
    // const { freeResources } = useResources()
    const [resources, setResources] = useAtom(resourcesAtom)
    const [freeResourcesList, setFreeResourcesList] = useState([])

    useEffect(() => {
      setFreeResourcesList(newres)
    }, [])


    return { resources, freeResourcesList }
}
const Gamefield = () => {
  const { units, updateUnitsPositions } = useUnits()
  const { freeResourcesList } = useResources()


  useEffect(() => {
    requestAnimationFrame(updateUnitsPositions)
  }, [updateUnitsPositions])

  return (
    <Box className='gamefield' sx={styles.gamefield} >
      {units.map((unit) => <Unit key={unit.id} unit={unit} />)}
      {freeResourcesList.map(resource => <Resource key={resource.id} resource={resource} />)}
    </Box>
  )
}

export default Gamefield

const styles = {
  gamefield: {
    border: '3px solid orange',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100dvw',
    height: '100vh',
    zIndex: 1,
    pointerEvents: 'none',
  },
}

const Resource = ({ resource }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${resource.position[1]}px`,
        left: `${resource.position[0]}px`,
        lineHeight: `${resource.size}px`,
        fontSize: `${resource.size}px`,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {resource.amount}
    </Box>
  )
}
