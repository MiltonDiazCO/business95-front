import axios from 'axios';

const b95Api = axios.create({
  baseURL: import.meta.env.VITE_B95_API_URL,
});

export { b95Api };
