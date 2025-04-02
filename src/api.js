import axios from 'axios';

const API_URL = 'https://webscrapper.inside-ai.xyz/';

export const fetchArticles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.article; // Extracting the articles array
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
