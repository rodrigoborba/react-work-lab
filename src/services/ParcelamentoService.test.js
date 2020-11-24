
import { validarParcelas, validarValorAmortizacaoPrevia, retornarSaldoDevedor } from './ParcelamentoService'

describe('Testes historia incluir Parcelamento - ParcelamentoService', () =>{


    const retornoValido = {
        mensagem: '',
        valido: true,
    };

    const retornoInvalido = {
        valido: false,
    };

    test('Teste inserir número de parcelas válido (5) ', () => {

        expect(validarParcelas(5)).toMatchObject(retornoValido);
    });

    test('Teste inserir número de parcelas valido (com type string) ', () => {

        expect(validarParcelas("5")).toMatchObject(retornoValido);
    });

    test('Teste inserir número de parcelas inválido (número negativo) ', () => {

        expect(validarParcelas(-1)).toMatchObject(retornoInvalido);
    });
    

    test('Teste inserir número de parcelas inválido (número igual a zero) ', () => {

        expect(validarParcelas(0)).toMatchObject(retornoInvalido);
    });

    test('Teste inserir número de parcelas inválido (número maior que seis) ', () => {

        expect(validarParcelas(7)).toMatchObject(retornoInvalido);
    });

    test('Teste inserir valor amortização inválido (inferior a 35% do saldo devedor atualizado por encargos contratuais) ', () => {

        expect(validarValorAmortizacaoPrevia(50, 100, 100, 1000)).toMatchObject(retornoInvalido);
    });

    test('Teste inserir valor amortização inválido (superior ao saldo devedor) ', () => {

        expect(validarValorAmortizacaoPrevia(5000, 100, 100, 2000)).toMatchObject(retornoInvalido);
    });

    test('Teste inserir valor amortização válido ', () => {

        expect(validarValorAmortizacaoPrevia(3000, 300, 100, 6000)).toMatchObject(retornoValido);
    });

    test('Teste calculo saldo devedor com amortização válida', () => {

        expect(retornarSaldoDevedor(3000)).toBe(10000);
    });

    test('Teste calculo saldo devedor com amortização nula ', () => {

        expect(retornarSaldoDevedor(undefined)).toBe(0);
    });

})

