
import { RetornoValidacao } from '../utils/ValidacaoUtils'

export function validarParcelas(value: number): RetornoValidacao {
    let retornoValidacao = {
        valido: true,
        mensagem: ''
    };
    if(value == undefined){
      retornoValidacao.valido = false;
      return retornoValidacao;
    }
    let parcela:number;
    try {
      parcela = +value;
    } catch {
      retornoValidacao.valido = false;
      return retornoValidacao;
    }

    if(parcela < 0){
      retornoValidacao.mensagem = 'Quantidade de parcelas inválida.';
      retornoValidacao.valido = false;
    }
    
    if(parcela === 0){
      retornoValidacao.mensagem = 'A quantidade de parcelas não pode ser igual a zero.';
      retornoValidacao.valido = false;
    }
    if(parcela > 6){
      retornoValidacao.mensagem = 'A quantidade de parcelas não pode ser superior a 6 (seis).';
      retornoValidacao.valido = false;
    }
    return retornoValidacao;
}


export function validarValorAmortizacaoPrevia(
                value: number,
                amortizacaoMinima: number,
                tarifaMinima: number,
                saldoMaximo: number
            ): RetornoValidacao {

    let retornoValidacao = {
        valido: true,
        mensagem: ''
    };

    if(value < amortizacaoMinima + tarifaMinima){
      retornoValidacao.mensagem = 'O valor informado para a amortização prévia é inferior a 35% do valor do saldo devedor atualizado por encargos contratuais.';
      retornoValidacao.valido = false;
    }
    if(value > saldoMaximo){
      retornoValidacao.mensagem = 'O valor informado para a amortização prévia é superior ao valor total devido da operação.';
      retornoValidacao.valido = false;
    }
    return retornoValidacao;
}

export function retornarSaldoDevedor(valorAmortizacao: any) {
  let saldoDevedor = 0;
  if(valorAmortizacao == undefined){
    return 0;
  }
  saldoDevedor = valorAmortizacao * 100 / 30;  
  return saldoDevedor;
}