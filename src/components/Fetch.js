import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchGallery = async (searchQuery, page) => {
  try {
    const params = new URLSearchParams({
      key: '29464455-01c51d89f246e5a0f625124f5',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page,
    });

    const response = await axios.get(`?${params}`);
    return response.data;
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
};
