'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
  // components/ResourcesTable.tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Avatar, Box, Button, Modal, Stack, Typography } from '@mui/material'

import NavStack from '@/components/NavStack'
import SignOutButton from '@/components/SignOutbutton'
import Canvas from '@/components/canvas/Canvas'
import { planetAtom } from '@/atoms'
import { useAtom } from 'jotai'

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

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [selectedPlanet, setSelectedPlanet] = useAtom(planetAtom)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.push('/signin')
  }, [session, status, router])

  useEffect(() => {
    console.log(selectedPlanet)
  }, [selectedPlanet])


  if (status === 'loading' || !session) {
    return <p>Loading...</p>
  }

  if (!session || !session.user) {
    return <div>User not logged in</div>
  }


  const resourceRows = Object.keys(selectedPlanet.resources).map(name => {
    const resource = selectedPlanet.resources[name as keyof ResourceRecord]
    console.log(`🚀 ~ file: layout.tsx:66 ~  ~ :`, resource, name)
    return ({
      id: name,
      image: resource.image,
      name: name,
      yield: resource.yield,
      rate: resource.rate,
      inventory: resource.inventory,
    })
  })

  // Define the columns
  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <Avatar src={params.value} alt={params.row.name} />
      ),
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'yield', headerName: 'Yield', width: 100, type: 'number' },
    { field: 'rate', headerName: 'Rate', width: 100, type: 'number' },
    { field: 'inventory', headerName: 'Inventory', width: 150, type: 'number' },
  ]

  return (
    <Stack className="flex flex-col w-full h-screen border-2 border-green-500">

      <Stack>
        <h1>{session.user.name}s Dashboard</h1>
        <SignOutButton />
      </Stack>

      <Stack flexDirection="row">
        <NavStack />
        <Stack justifyContent="space-between">
          {children}
          <Button onClick={handleOpen}>Open modal</Button>


          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/* Header */}
              <Stack>
                <Box>
                  {/* <Image /> */}
                </Box>
                <Box>
                  {/* <Manager /> */}
                </Box>
              </Stack>

              {/* Resource Table */}
              <Stack>
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
              </Stack>
              {/* upgrades */}
              <Stack>
              </Stack>




              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
          <Canvas />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default DashboardLayout
