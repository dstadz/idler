import { Button as MUIButton } from '@mui/material'
import React from 'react'

const Button = ({ children, size, onClick }:
  {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    onClick: () => void
  }) => (
  <MUIButton
    onClick={onClick}
    variant="contained"
    size={size}
    sx={{ m: 'auto', ml: 0 }}
  >
    {children}
  </MUIButton>
)

export default Button
