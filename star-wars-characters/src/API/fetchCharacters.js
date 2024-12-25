import axios from 'axios';
import config from './config';

export const fetchCharacters = async () => {
  try {
    const response = await axios.get(`${config.BASE_URL}/people?limit=5`);
    return response.data;
  } catch (error) {
    console.log('Error fetching characters:', error);
    throw error;
  }
};