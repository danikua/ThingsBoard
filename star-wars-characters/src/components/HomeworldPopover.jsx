import { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { fetchHomeworld } from '../API/homeworldAPI';

export const HomeworldPopover = ({ anchorEl, onClose, character }) => {
  const [homeworldData, setHomeworldData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadHomeworldData = async () => {
    if (character?.homeworld) {
      setLoading(true);
      try {
        const data = await fetchHomeworld(character.homeworld);
        setHomeworldData(data);
      } catch {
        setHomeworldData(null);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadHomeworldData();
  }, [character]);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      sx={{ maxWidth: '90vw' }}
    >
      <div style={{ padding: '16px' }}>
        {loading ? (
          <Typography>Loading homeworld data...</Typography>
        ) : homeworldData ? (
          <>
            <Typography variant="h6">Homeworld Details</Typography>
            <Typography>Name: {homeworldData.name}</Typography>
            <Typography>Climate: {homeworldData.climate}</Typography>
            <Typography>Terrain: {homeworldData.terrain}</Typography>
            <Typography>Population: {homeworldData.population}</Typography>
          </>
        ) : (
          <Typography>No data available</Typography>
        )}
      </div>
    </Popover>
  );
};
