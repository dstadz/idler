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
      top: -100,
    }}>
      <Stack>{modalType}</Stack>
      <Stack>{type} {level} {status}</Stack>

      {modalType === 'Admin' && <Stack flexDirection={'row'}>
        <Button onClick={() => console.log('Build')}>Build</Button>
      </Stack>}
      {modalType === 'user' && <Stack flexDirection={'row'}>
        <Button onClick={() => console.log('Build')}>Build</Button>
        <Button onClick={() => console.log('AD')}>AD for x2</Button>
      </Stack>}
    </Stack>
  )
}

export default HexCellModal
