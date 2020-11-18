
import { validarCpf,validarCnpj  } from '../../utils/ValidacaoUtils'

describe('Testes componente utiliário para validações de formatos', () =>{

    test('Testar validador CPF válido', () => {
        expect(validarCpf('01686548060')).toBe(true);
    });

    test('Testar validador CPF inválido', () => {
        expect(validarCpf('01686548061')).toBe(false);
    });

    test('Testar validador CNPJ válido', () => {
        expect(validarCnpj('12855644000140')).toBe(true);
    });

    test('Testar validador CNPJ inválido', () => {
        expect(validarCnpj('12855644000141')).toBe(false);
    });

})

