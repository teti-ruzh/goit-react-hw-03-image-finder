import axios from 'axios';
const API_KEY = '34284837-29260c72d5bbc46b76d9e1104';
const BASE_URL = 'https://pixabay.com/api/';


const getImg = (query, page = 1) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(url)
  .then(response => {
    return response.data})
}

const api = {
    getImg,
  };
  export default api;
