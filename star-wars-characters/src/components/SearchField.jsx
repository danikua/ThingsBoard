import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Filter({ onFilterChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Search Character"
        variant="outlined"
        onChange={handleInputChange}
        fullWidth
        size={isMobile ? "small" : "medium"}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: isMobile ? 1 : 1.5
          }
        }}
      />
    </Box>
  );
}