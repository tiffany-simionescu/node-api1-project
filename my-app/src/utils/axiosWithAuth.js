import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'https://node-api1-project-tiffany.herokuapp.com',
    headers: {}
  });
};