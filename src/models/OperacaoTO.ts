import ClienteTO from './ClienteTO'

type OperacaoTO = {
    id: number,
    cliente: ClienteTO,
    operacaoCliente: string,
    nome: string,
    audio: any,
    termo: any,
}

export default OperacaoTO;