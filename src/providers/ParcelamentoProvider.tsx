import BaseApi from '../services/BaseApi'
import { getLoggedUser } from '../Components/seguranca/Auth'
import { removerMascaraDocumento } from '../utils/Mascaras'
import AmortizacaoPreviaTO from '../models/AmortizacaoPreviaTO' 

const getConfig = () => {
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  }
}


export async function detalharOperacaoCliente(operacao: string): Promise<any> {
  let login = getLoggedUser();
 
  const response = await BaseApi.get('/operacoes/carteira/' +  login + '/cliente/' + operacao)
      .then((response) => {
        return response.data
      })
      .catch(erro => {
        return erro.response.data
      })
  return response;
}


    export  async function salvarSolicitacaoParcelamento (data: AmortizacaoPreviaTO): Promise<any> {
     
      return BaseApi.post('/parcelamento', data)
    }