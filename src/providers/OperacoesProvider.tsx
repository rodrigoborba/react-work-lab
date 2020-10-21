import BaseApi from '../services/BaseApi'
import { getUserFromToken } from '../Components/seguranca/Auth'

export async function consultarOperacoes(): Promise<any> {
  //let user = getUserFromToken();
  const response = await BaseApi.get('/operacoes')
  return response.data
}

export async function consultarOperacoesFiltro(operacao: string, documento: string, nome: string) {
  //let user = getUserFromToken();
  console.log('passou provider ... ' + getUserFromToken());
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