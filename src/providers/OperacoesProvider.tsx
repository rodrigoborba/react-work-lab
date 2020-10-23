import BaseApi from '../services/BaseApi'
import { getUserFromToken } from '../Components/seguranca/Auth'
import { removerMascaraDocumento } from '../utils/Mascaras'

export async function consultarOperacoesCarteira(): Promise<any> {
  let login = getUserFromToken();
  const response = await BaseApi.get('/operacoes/carteira/' + login)
      .then((response) => {
        return response.data
      })
      .catch(erro => {
        return erro.response.data
      })
  return response;
}

export async function consultarOperacoesCarteiraFiltro(operacao: string, documento: string, nome: string) {
  if (operacao || documento || nome) {
    let login = getUserFromToken();
    if(null !== documento){
      documento = removerMascaraDocumento(documento);     
    }
    const response = await BaseApi.get(
        '/operacoes/carteira/' + login + '/cliente/' + documento + '/' + nome + '/' + operacao)
      .then((response) => {
        return response.data
      })
      .catch(erro => {
        return erro.response.data
      })
      return response;
  }else{
    return consultarOperacoesCarteira()
  }
}