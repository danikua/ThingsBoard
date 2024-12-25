import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { fetchCharacters } from '../API/fetchCharacters';
import { HomeworldPopover } from './HomeworldPopover';
import Filter from './SearchField';
import CharacterCard from './CharacterCard';
import CircularIndeterminate from './Loader';

export default function BasicTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters();
        const initialData = data.slice(0, 5);
        setCharacters(initialData);
        setFilteredCharacters(initialData);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleHomeworldClick = (event, character) => {
    setAnchorEl(event.currentTarget);
    setSelectedCharacter(character);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filter) => {
    const filtered = filter
      ? characters.filter((char) =>
          char.name.toLowerCase().includes(filter.toLowerCase())
        )
      : characters;
    setFilteredCharacters(filtered);
  };

  if (loading || error) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color={error ? 'error.main' : 'text.primary'}>
          {error || <CircularIndeterminate />}
        </Typography>
      </Box>
    );
  }

  const renderMobileView = () => (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Filter onFilterChange={handleFilterChange} />
      <Box sx={{ mt: 2, width: '100%' }}>
        {filteredCharacters.length ? (
          filteredCharacters.map((char) => (
            <CharacterCard
              key={char.name}
              character={char}
              onHomeworldClick={handleHomeworldClick}
            />
          ))
        ) : (
          <Typography>No characters available</Typography>
        )}
      </Box>
    </Box>
  );

  const renderTableView = () => (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, width: '100%', maxWidth: 900 }}
    >
      <Table sx={{ minWidth: isTablet ? 450 : 650 }} aria-label="character table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Birth Year</TableCell>
            <TableCell align="center">Homeworld</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCharacters.length ? (
            filteredCharacters.map((char) => (
              <TableRow key={char.name}>
                <TableCell>
                  <Typography noWrap>{char.name}</Typography>
                </TableCell>
                <TableCell align="center">{char.gender}</TableCell>
                <TableCell align="center">{char.birth_year}</TableCell>
                <TableCell align="center">
                  <Button
                    size={isTablet ? 'small' : 'medium'}
                    onClick={(event) => handleHomeworldClick(event, char)}
                  >
                    View Homeworld
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No characters available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Filter onFilterChange={handleFilterChange} />
      {isMobile ? renderMobileView() : renderTableView()}

      {selectedCharacter && (
        <HomeworldPopover
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          character={selectedCharacter}
        />
      )}
    </Box>
  );
}
