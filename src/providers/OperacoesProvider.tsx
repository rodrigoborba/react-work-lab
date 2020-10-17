import BaseApi from '../services/BaseApi'


export async function consultarOperacoes(): Promise<any> {
  const response = await BaseApi.get('/operacoes')
  return response.data
}