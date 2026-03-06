import { b95Api } from '@/api/b95';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { Moneda } from '@/modules/catalogos/interfaces/moneda.interface';

export const getMonedas = async () => {
  try {
    const { data } = await b95Api.get<Moneda[]>(`/monedas`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
