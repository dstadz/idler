import React, { useState } from 'react'
import { Stack } from "@mui/material"
import Button from '../UI/Button'
import { BUILDING_OBJECTS, tileBackgrounds } from '@/utils/constants'

const HexCellModal = ({ cell, modalType }: { cell: HexCell, modalType: string }) => {
  const {
    type,
    level,
    // status,-
  } = cell

  const [newType, setNewType] = useState('')

  return (
    <Stack sx={{
      border: '3px solid red',
      borderRadius: 4,
      background: 'hsla(247, 73%, 90%, 1)',
      justifyContent: 'space-between',
      position: 'absolute',
      top: -160,
      minHeight: 160,
      minWidth: 120
    }}>
      <Stack
        sx={{
          p: 1,
          background: tileBackgrounds.SEA,
          color: 'white',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,

        }}
      >{modalType}</Stack>
      <Stack
        sx={{
          p: 1,

        }}
      >lvl:{level} {type} {status}</Stack>

      {modalType === 'Admin' && <Stack flexDirection={'column'}>
        Build Options
        {Object.keys(BUILDING_OBJECTS).map(key => (
          <Button key={key} onClick={() => setNewType(key)}>{key}</Button>
        ))}
        <Button onClick={() => console.log('Build')}>Build</Button>
      </Stack>}
      {modalType === 'user' && (
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          p={2}
          m={2}
        >
          <Button onClick={() => console.log('Build')}>Build</Button>
          <Button onClick={() => console.log('AD')}>AD for x2</Button>
      </Stack>)}
    </Stack>
  )
}

export default HexCellModal
