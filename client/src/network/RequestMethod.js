import axios from 'axios';

const BASE_URL = 'https://al-9dkg.onrender.com/api/';

const accessToken = localStorage.getItem('accessToken');

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${accessToken}` },
});
