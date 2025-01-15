import { Box, Button as MUIButton } from '@mui/material'
import React from 'react'

const Button = ({
  children,
  size,
  onClick,
  sx,
}: {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    onClick: () => void
    sx?: React.CSSProperties
  }) => (
    <Box>
      <MUIButton
        onClick={onClick}
        variant="contained"
        size={size}
        sx={{ m: 'auto', ml: 0, ...sx }}
        >
        {children}
      </MUIButton>
    </Box>
)

export default Button
