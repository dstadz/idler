import React from 'react'
import { Avatar, Box, Button, Modal, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAtom } from 'jotai'
import { moneyAtom, planetAtom } from '@/atoms'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  bgcolor: 'rgba(15, 15, 30, 0.9)',
  borderRadius: '20px',
  border: '2px solid rgba(0, 255, 255, 0.5)',
  boxShadow: '0px 0px 40px 15px rgba(0, 255, 255, 0.6)',
  backdropFilter: 'blur(10px)',
  color: '#FFFFFF',
  p: 5,
  transition: 'background 0.5s ease',
}

const neonButtonStyle = {
  border: '2px solid #0ff',
  color: '#0ff',
  fontWeight: 'bold',
  background: 'rgba(0, 0, 0, 0.8)',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #00ffff, #0000ff)',
    boxShadow: '0 0 20px #0ff, 0 0 40px #00f',
    transform: 'scale(1.1)',
  },
}

export const getUpgradeCost = (currentLevel: number) => {
  // Basic cost formula: increases with level
  return Math.floor(100 * Math.pow(1.2, currentLevel))
}

const PlanetModal = () => {
  const [planet, setPlanet] = useAtom(planetAtom)
  const handleClose = () => { setPlanet(null) }

  const [money, setMoney] = useAtom(moneyAtom)
  const handleUpgrade = (skill: string) => {
    const cost = getUpgradeCost(planet.levels[skill])
    if (money < cost) {
      console.log('Not enough money!')
      return
    }
    planet.updateSkill(skill)
    setMoney(prevMoney => prevMoney - cost)
  }
  if (!planet) return null
  const { planetName, levels, resources, yields } = planet

  const resourceRows = Object.keys(resources).map(name => ({
    id: name,
    name,
    yields: yields[name],
    rate: levels?.mineRate * yields[name],
    amount: resources[name],
  }))

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: params => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{
            border: '2px solid #0ff',
            boxShadow: '0 0 10px #0ff',
          }}
        />
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
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h4" sx={{ fontFamily: 'Orbitron, sans-serif', color: '#0ff' }}>
            {planetName}
          </Typography>

          <Box sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}>
            <Typography variant="h6" sx={{ mb: 1, color: '#0ff', fontWeight: 'bold' }}>
              Resource Inventory
            </Typography>
            <DataGrid
              rows={resourceRows}
              columns={columns}
              pageSize={Object.keys(resources).length}
              disableSelectionOnClick
              hideFooter
              sx={{
                bgcolor: 'rgba(15, 15, 25, 0.8)',
                borderRadius: '12px',
                color: '#fff',
                '& .MuiDataGrid-columnHeaders': {
                  background: 'linear-gradient(45deg, #0ff, #00f)',
                  color: '#000',
                  fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            />
          </Box>

          <Stack spacing={3} sx={{ mt: 2, width: '100%' }}>
            {Object.keys(levels).map((skill, idx) => (
              <Stack
                key={idx}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  background: 'rgba(15, 15, 30, 0.7)',
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {skill}
                  </Typography>
                  <Typography>Lv. {levels[skill]}</Typography>
                </Stack>
                <Button onClick={() => handleUpgrade(skill)} sx={neonButtonStyle}>
                  ${getUpgradeCost(planet.levels[skill])}
                </Button>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}

export default PlanetModal
