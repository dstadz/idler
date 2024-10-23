// components/PlanetModal.tsx
'use client'
import React from 'react'
import { Avatar, Box, Modal, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAtom } from 'jotai'
import { planetAtom } from '@/atoms'
import { useSession } from 'next-auth/react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '5px solid #f00',
  boxShadow: 24,
  p: 4,
}

interface PlanetModalProps {
  open: boolean
  handleClose: () => void
}

const PlanetModal = ({ open, handleClose }: PlanetModalProps) => {
  const { data: session } = useSession()
  const [selectedPlanet] = useAtom(planetAtom)

  const resourceRows = Object.keys(selectedPlanet.resources).map(name => ({
    id: name,
    name,
    yields: selectedPlanet.yields[name],
    rate: selectedPlanet?.levels?.mineRate * selectedPlanet.yields[name],
    amount: selectedPlanet.resources[name],
  }))

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: params => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'yields', headerName: 'Yield', width: 100, type: 'number' },
    { field: 'rate', headerName: 'Rate', width: 100, type: 'number' },
    { field: 'amount', headerName: 'Amount', width: 150, type: 'number' },
  ]

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Stack>
          <Box>{selectedPlanet.name}</Box>
          <Avatar src={session?.user?.image} alt={session?.user?.name} />
        </Stack>

        <Box sx={{ height: 400, width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Resource Inventory
          </Typography>
          <DataGrid
            rows={resourceRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Box>

        <Typography variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  )
}

export default PlanetModal
