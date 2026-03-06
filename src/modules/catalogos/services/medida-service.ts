import { b95Api } from '@/api/b95';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { Medida } from '@/modules/catalogos/interfaces/medida.interface';

export const getMedidas = async () => {
  try {
    const { data } = await b95Api.get<Medida[]>(`medidas`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
