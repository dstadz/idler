import React from 'react'
import { Stack } from "@mui/material"
import Button from '../UI/Button'

const HexCellModal = ({ cell, modalType }: { cell: HexCell, modalType: string }) => {
  const {
    type,
    level,
    status,
  } = cell

  return (
    <Stack sx={{
      border: '3px solid red',
      background: 'white',
      position: 'absolute',
      bottom: 100,
      minHeight: 160,
      minWidth: 120
    }}>
      <Stack>{modalType}</Stack>
      <Stack>{type} {level} {status}</Stack>

      <Stack>{modalType}</Stack>
      <Stack
        sx={{
          p: 1,

        }}
      >lvl:{level} {type} {status}</Stack>

      {modalType === 'Admin' && <Stack flexDirection={'column'}>
        Build Options
        {Object.keys(BUILDING_OBJECTS).map(key => (
          <Button key={key} sx={{ p: .5 }} onClick={() => setNewType(key)}>{key}</Button>
        ))}
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
