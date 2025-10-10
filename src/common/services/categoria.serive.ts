import { b95Api } from '@/api/b95.ts';
import { handleAxiosError } from '@/common/utils/handle.axios.error';
import type { Categoria } from '../interfaces/categoria.interface';

export const getCategorias = async () => {
  try {
    const { data } = await b95Api.get<Categoria[]>(`/categorias`);
    return data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
