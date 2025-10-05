import { b95Api } from '@/api/b95.ts';
import type { Inversion } from '@/modules/inversiones/interfaces/inversion.interface';
import { handleAxiosError } from '@/common/utils/handle.axios.error';

export const getInversionesPorSocio = async (idSocio: number) => {
  try {
    const { data } = await b95Api.get<Inversion[]>(`/socios/${idSocio}/inversiones`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
