import type { ErrorB95Api } from '@/common/interfaces/error.b95api.interface';
import type { AxiosError } from 'axios';

export const handleAxiosError = (error: unknown): ErrorB95Api | undefined => {
  const axiosError = error as AxiosError<ErrorB95Api>;
  return axiosError.response?.data;
};
