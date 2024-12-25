import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';

export default function CharacterCard({ character, onHomeworldClick }) {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
      }}
    >
      <Typography variant="h6">{character.name}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Gender: {character.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birth Year: {character.birth_year}
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          onClick={(event) => onHomeworldClick(event, character)}
        >
          Homeworld
        </Button>
      </Box>
    </Paper>
  );
}