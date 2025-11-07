import { b95Api } from '@/api/b95';
import type { Socio } from '@/modules/socios/interfaces/socio.interface';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { BalanceSocio } from '@/modules/mi-perfil/interfaces/balance.socio';

export const getSocio = async (idSocio: number) => {
  try {
    const { data } = await b95Api.get<Socio>(`/socios/${idSocio}`);
    return { data };
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getBalancesSocio = async (idSocio: number) => {
  try {
    const { data } = await b95Api.get<BalanceSocio>(`/socios/${idSocio}/balance`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
