import BaseApi from '../services/BaseApi'
import { getLoggedUser } from '../Components/seguranca/Auth'
import { removerMascaraDocumento } from '../utils/Mascaras'

export async function consultarOperacoesCarteira(): Promise<any> {
  let login = getLoggedUser();
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
    let login = getLoggedUser();

    documento = removerMascaraDocumento(documento);
    
    operacao = operacao.replaceAll(/\s/g,"");
    operacao = operacao === "..." ? '': operacao;

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