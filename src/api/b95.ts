import axios from 'axios';

const b95Api = axios.create({
  baseURL: import.meta.env.VITE_B95_API_URL,
});

b95Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

export { b95Api };
