import BaseApi from '../services/BaseApi'

export default class OperacoesProvider {

  async consultarOperacoes(): Promise<any> {
    return BaseApi.get('/operacoes');
  }
}