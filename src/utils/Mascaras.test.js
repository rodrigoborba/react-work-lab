
import { formatarDocumento, removerMascaraDocumento } from './Mascaras'

describe('Testes componente utilitario de mascaras ', () =>{

    test('Colocar em formato CPF', () => {
        expect(formatarDocumento('56644043291')).toBe('566.440.432-91');
    });

    test('Colocar em formato CNPJ', () => {
        expect(formatarDocumento('12855644000140')).toBe('12.855.644.0001/40');
    });

    test('Remover mascara CPF', () => {
        expect(removerMascaraDocumento('566.440.432-91')).toBe('56644043291');
    });

    test('Remover mascara CNPJ', () => {
        expect(removerMascaraDocumento('12.855.644.0001/40')).toBe('12855644000140');
    });

})

