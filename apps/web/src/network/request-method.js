import axios from 'axios';

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_URL
  : import.meta.env.VITE_LIVE_URL;

const accessToken = localStorage.getItem('accessToken');

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${accessToken}` },
});
