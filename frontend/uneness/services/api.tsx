import axios from 'axios';


// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1/';
const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1/';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // using cookies for auth
  headers: {
    'Content-Type': 'application/json',
  },
});
