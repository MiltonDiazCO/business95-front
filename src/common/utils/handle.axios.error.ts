import type { B95ApiError } from '@/api/interfaces/b95.api.error.interface';
import type { B95AuthError } from '@/api/interfaces/b95.auth.error.interface';
import type { AxiosError } from 'axios';

export const obtenerB95ApiError = (error: unknown): B95ApiError | undefined => {
  const axiosError = error as AxiosError<B95ApiError>;
  return axiosError.response?.data;
};

export const obtenerB95AuthError = (error: unknown): B95AuthError | undefined => {
  const axiosError = error as AxiosError<B95AuthError>;
  return axiosError.response?.data;
}
