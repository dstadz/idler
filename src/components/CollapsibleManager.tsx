import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface CollapsibleManagerProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapsibleManager({ title, children }: CollapsibleManagerProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Paper sx={styles.container}>
      <Box sx={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small">
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={isExpanded}>
        <Box sx={styles.content}>
          {children}
        </Box>
      </Collapse>
    </Paper>
  );
}

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    zIndex: 1000,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 1,
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
  content: {
    padding: 1,
    maxHeight: '400px',
    overflowY: 'auto',
  },
};
