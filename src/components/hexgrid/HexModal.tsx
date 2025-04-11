import React from 'react'
import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { HexCell } from '../../types/HexCell'
import { BUILDING_OBJECTS } from '../../utils/constants'
import { useGameState } from '../../contexts/GameStateContext'

interface HexModalProps {
  cell: HexCell
  modalType: 'Admin' | 'Player'
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
  color: 'white',
}

const HexCellModal: React.FC<HexModalProps> = ({ cell, modalType }) => {
  const { building } = cell
  const { gameState, setGameState } = useGameState()

  if (!building) return null

  const buildingInfo = BUILDING_OBJECTS[building.type]

  const handleUpgrade = () => {
    if (!building) return
    const newLevel = building.level + 1
    const newBuilding = { ...building, level: newLevel }
    const newCell = { ...cell, building: newBuilding }
    const newGrid = gameState.grid.map(row =>
      row.map(c => c.id === cell.id ? newCell : c)
    )
    setGameState({ ...gameState, grid: newGrid })
  }

  const handleDemolish = () => {
    const newCell = { ...cell, building: undefined }
    const newGrid = gameState.grid.map(row =>
      row.map(c => c.id === cell.id ? newCell : c)
    )
    setGameState({ ...gameState, grid: newGrid })
  }

  return (
    <Modal
      open={true}
      onClose={() => {}}
      aria-labelledby="hex-cell-modal"
      aria-describedby="hex-cell-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack spacing={3}>
          <Typography variant="h5" component="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            {buildingInfo.name}
          </Typography>

          <Stack spacing={1}>
            <Typography variant="body1">
              Level: {building.level}
            </Typography>
            <Typography variant="body1">
              Type: {building.type}
            </Typography>
            <Typography variant="body1">
              Status: {building.status}
            </Typography>
            <Typography variant="body1">
              Production: {buildingInfo.production * building.level} / turn
            </Typography>
            <Typography variant="body1">
              Maintenance: {buildingInfo.maintenance * building.level} / turn
            </Typography>
          </Stack>

          {modalType === 'Admin' && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpgrade}
                disabled={building.level >= 3}
                sx={{ flex: 1 }}
              >
                Upgrade (Level {building.level + 1})
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDemolish}
                sx={{ flex: 1 }}
              >
                Demolish
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Modal>
  )
}

export default HexCellModal
