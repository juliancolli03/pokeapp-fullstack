import axios from 'axios';
import { useMemo } from 'react';

const useAxios = () => {
  const token = localStorage.getItem('token');

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL, 
    });

    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = token;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [token]);

  return axiosInstance;
};

export default useAxios;
