import { b95Api } from '@/api/b95.ts';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { InversionBalance } from '@/modules/inversiones/interfaces/inversion.balance.interface';

export const getInversionesPorSocio = async () => {
  try {
    const { data } = await b95Api.get<InversionBalance[]>(`/socios/inversiones`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
