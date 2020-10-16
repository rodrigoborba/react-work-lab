import BaseApi from '../services/BaseApi'

export async function getOperacoes(): Promise<any> {
  const response = await BaseApi.get('/operacoes')
  return response.data
}

export async function getOperacoesPorId (id: number) {
  if (id) {
    const response = await BaseApi.get(`/operacoes/${id}`)
      .then((response) => {
        return response
      })
      .catch(error => {
        return error.response
      });
    return response.data
  }
  return null
}
