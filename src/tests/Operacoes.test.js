
import { formatarDocumento, removerMascaraDocumento, textMaskOperacao } from '../utils/Mascaras'
import { getUserFromToken } from '../utils/AuthUtils'

describe('Testes historia Listar Operações', () =>{
    
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

    test('Recuperar username do usuário logado', () => {
        expect(
            getUserFromToken('eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfeHNoUXphZ1FZVjdLY3Y1RDltcjVIakRmNW9mcy1IMUhDT1lQZ2Y3aG80In0.eyJqdGkiOiIyYWUxZmE2Ni04ZGM1LTRmNjYtYTM1MC1mMmFiNGQzYzViMWQiLCJleHAiOjE2MDM0OTExMzIsIm5iZiI6MCwiaWF0IjoxNjAzNDkwMjMyLCJpc3MiOiJodHRwczovL3Myc3NvZDAyLmRyZWFkcy5ibmI6ODQ0My9hdXRoL3JlYWxtcy9EZXNlbnYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZDQzOTRiMGQtMGE4Zi00NGRmLWEyMzQtMTFjMGZjNTgzNzY1IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiczU0OS1lbXByZXNhLXdlYiIsIm5vbmNlIjoiZTM4ZjY5ZmUtNDFiZC00OWU1LTkzNTYtZmRlY2YxOTJhMjI2IiwiYXV0aF90aW1lIjoxNjAzNDkwMjMyLCJzZXNzaW9uX3N0YXRlIjoiMzIyODE5ZjItYWIxMy00ZjZjLThkYWItMWExNGI0NDViMDUyIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vYXBwLWRldi5kcmVhZHMuYm5iIiwiaHR0cDovL2xvY2FsaG9zdDozMDAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQiLCJ1c2VyRmVkZXJhdGlvbiI6IkRSRUFEUyIsInByZWZlcnJlZF91c2VybmFtZSI6ImQwMDE5NTYiLCJnaXZlbl9uYW1lIjoiUm9kcmlnbyBTaWx2YSBkZSBCb3JiYSBEMDAxOTU2Iiwibm9tZVRyYXRhbWVudG8iOiJSb2RyaWdvIiwiZW1haWwiOiJkMDAxOTU2QGRyZWFkcy5ibmIifQ.CU_cz5FMXMDu71FfyuB1nP4UMTJyV03GT5WpJunxfyFUWtmyl0ySY5pEoHahPstppUgaKJEOVU_i4wt8oEYj6rzCWE-V9qCWbpQEVO2xWKsm4tydtj18A_63wnzeI-gYK0ULloqu0vmsbAl8hpiHCdbcDjVegII5kFkzQ9cDw2gBST4uMGs87bC9w4ZCSeeIGL1JgiY19ezfpVY__CTkqbr9hRqxqRu82yVsU4428wH1Rwrtg1u6kUPI3o4Xwj6u2nsHl-YYqBVtgy7ta3NSGZ7Rc3MdSb0-9dQA7f0T10mq1EK3RDenQXs48ybmnHhdlflhldhhR6T5hR-nos0caA'))
            .toBe('d001956');
    });

    

})

