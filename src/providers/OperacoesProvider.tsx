import BaseApi from '../services/BaseApi'


export async function consultarOperacoes(): Promise<any> {
  const response = await BaseApi.get('/operacoes')
  return response.data
}

export async function consultarOperacoesFiltro(operacao: string, documento: string, nome: string) {
  if (operacao || documento || nome) {
    await BaseApi.get('/operacoes',
      {
        params: {
          operacao: operacao,
          documento: documento,
          nome: nome
        },
      })
      .then((response) => {
        return response.data
      })
      .catch(erro => {
        return erro.response.data
      })
  }else{
    return consultarOperacoes()
  }
}