import React from 'react'
import { Box, Button, Modal, Stack, Typography, SxProps, Theme, IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { HexCell, BuildingType } from '../../types/game'
import { BUILDING_OBJECTS } from '../../utils/constants'
import { useGameState } from '../../contexts/GameStateContext'

interface HexModalProps {
  cell: HexCell
  modalType: 'Admin' | 'Player'
  onClose: () => void
}
const modalStyle: SxProps<Theme> = {
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
  outline: 'none',
}

const closeButtonStyle: SxProps<Theme> = {
  position: 'absolute',
  right: 8,
  top: 8,
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}

const HexCellModal: React.FC<HexModalProps> = ({ cell, modalType, onClose }) => {
  const { building } = cell
  const { dispatch } = useGameState()

  if (!building) return null

  const buildingInfo = BUILDING_OBJECTS[building.type as BuildingType]

  const handleUpgrade = (): void => {
    if (!building) return
    dispatch({ type: 'UPGRADE', cellId: cell.id })
  }

  const handleDemolish = (): void => {
    dispatch({ type: 'DEMOLISH', cellId: cell.id })
  }

  const handleModalClick = (e: React.MouseEvent) => {
    // Prevent clicks inside the modal from closing it
    e.stopPropagation()
  }

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="hex-cell-modal"
      aria-describedby="hex-cell-modal-description"
      onClick={onClose}
    >
      <Box sx={modalStyle} onClick={handleModalClick}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={closeButtonStyle}
        >
          <CloseIcon />
        </IconButton>

        <Stack spacing={3}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h5" component="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            </Typography>
          </Stack>

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
            </Typography>
            <Typography variant="body1">
            </Typography>
          </Stack>

          {modalType === 'Admin' && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpgrade}
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
