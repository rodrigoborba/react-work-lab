
import { formatarDocumento, removerMascaraDocumento, formatarValorMoedaReal, mascaraMonetaria } from './Mascaras'

describe('Testes componente utilitario de mascaras ', () =>{

    test('Colocar em formato CPF', () => {
        expect(formatarDocumento('56644043291')).toBe('566.440.432-91');
    });

    test('Colocar em formato CPF sem digito 0 inicial', () => {
        expect(formatarDocumento('6644043291')).toBe('066.440.432-91');
    });

    test('Colocar em formato CNPJ', () => {
        expect(formatarDocumento('12855644000140')).toBe('12.855.644.0001/40');
    });

    test('Colocar em formato CNPJ sem digito 0', () => {
        expect(formatarDocumento('2855644000140')).toBe('02.855.644.0001/40');
    });

    test('Remover mascara CPF', () => {
        expect(removerMascaraDocumento('566.440.432-91')).toBe('56644043291');
    });

    test('Remover mascara CNPJ', () => {
        expect(removerMascaraDocumento('12.855.644.0001/40')).toBe('12855644000140');
    });

    test('Formatar valor redondo em real', () => {
        expect(formatarValorMoedaReal(500)).toContain('500.00');
    });

    test('Formatar valor com centavos em real', () => {
        expect(formatarValorMoedaReal(500.57)).toContain('500.57');
    });

    test('Formatar valor acima de mil com centavos em real', () => {
        expect(formatarValorMoedaReal(1500.57)).toContain('1,500.57');
    });

    test('Formatar valor nulo em real', () => {
        expect(formatarValorMoedaReal(null)).toBe('');
    });

    test('Formatar valor redondo em real', () => {
        expect(mascaraMonetaria(500)).toContain('500.00');
    });

    test('Formatar valor nulo em real', () => {
        expect(mascaraMonetaria(null)).toBe(undefined);
    });

})

