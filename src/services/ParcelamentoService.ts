
import { RetornoValidacao } from '../utils/ValidacaoUtils'

export function validarParcelas(value: number): RetornoValidacao {
    let retornoValidacao = {
        valido: true,
        mensagem: ''
    };

    if(value === 0){
      retornoValidacao.mensagem = 'A quantidade de parcelas não pode ser igual a zero.';
      retornoValidacao.valido = false;
    }
    if(value > 6){
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