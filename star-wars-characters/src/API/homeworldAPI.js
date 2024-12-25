import axios from 'axios';

export const fetchHomeworld = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch homeworld:', error);
    throw error;
  }
};
