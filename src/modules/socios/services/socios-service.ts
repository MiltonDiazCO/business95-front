import { b95Api } from '@/api/b95';
import type { Socio } from '@/modules/socios/interfaces/socio.interface';
import { handleAxiosError } from '@/common/utils/handle.axios.error';

export const getSocio = async (idSocio: number) => {
  try {
    const { data } = await b95Api.get<Socio>(`/socios/${idSocio}`);
    return { sucess: true, data };
  } catch (error: unknown) {
    const dataError = handleAxiosError(error);
    return { sucess: false, dataError };
  }
};
