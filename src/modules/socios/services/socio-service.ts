import { b95Api } from '@/api/b95';
import { obtenerB95ApiError } from '@/common/utils/handle.axios.error';
import type { BalanceSocio } from '@/modules/socios/interfaces/balance.socio.interface';
import type { Socio } from '@/modules/socios/interfaces/socio.interface';

export const getSocio = async (idSocio: number) => {
  try {
    const { data } = await b95Api.get<Socio>(`/socios/${idSocio}`);
    return { data };
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};

export const getBalancesSocio = async () => {
  try {
    const { data } = await b95Api.get<BalanceSocio>(`/socios/balance`);
    return data;
  } catch (error) {
    throw obtenerB95ApiError(error);
  }
};
