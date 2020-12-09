import BaseApi from '../Api'

import { getCNPJ, getLoggedUser } from '../Auth'
import { removerMascaraDocumento } from '../utils/Mascaras'


export async function consultarOperacoesCarteira(): Promise<any> {
  let cnpj = getCNPJ();
  if(null === cnpj || '' === cnpj){
    cnpj = getLoggedUser();
  }
  const response = await BaseApi.get('/operacoes/carteira/' + cnpj)
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
    let cnpj = getCNPJ();
    if(null === cnpj || '' === cnpj){
      cnpj = getLoggedUser();
    }
    documento = removerMascaraDocumento(documento);
    
    operacao = operacao.replace(/\s/g,"");
    operacao = operacao === "..." ? '': operacao;

    const response = await BaseApi.get(
        '/operacoes/carteira/' + cnpj + '/cliente/' + documento + '/' + nome + '/' + operacao)
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