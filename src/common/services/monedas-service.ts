import { b95Api } from '@/api/b95';
import type { Moneda } from '@/common/interfaces/moneda.interface';
import { handleAxiosError } from '@/common/utils/handle.axios.error';

export const getMonedas = async () => {
  try {
    const { data } = await b95Api.get<Moneda[]>(`/monedas`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
