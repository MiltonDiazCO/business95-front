import { b95Api } from '@/api/b95';
import type { Medida } from '../interfaces/medida.interface';
import { handleAxiosError } from '../utils/handle.axios.error';

export const getMedidas = async () => {
  try {
    const { data } = await b95Api.get<Medida[]>(`medidas`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
