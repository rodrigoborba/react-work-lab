import React, {useState, useEffect } from "react";
import { Container, Snack, Buttons, Row, Page } from 'bnb-ui/dist'
import MUIDataTable from 'mui-datatables';
import { IconButton, Tooltip, Grid, TextField  } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/SearchOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'
import PublishIcon from '@material-ui/icons/Publish';

import { detalharOperacaoCliente, salvarSolicitacaoParcelamento } from '../../providers/ParcelamentoProvider'
import OperacaoTO from '../../models/OperacaoTO' 
import AmortizacaoPreviaTO from '../../models/AmortizacaoPreviaTO' 
import { init } from '../../Components/seguranca/Auth'
import { textMaskCPF, textMaskCNPJ, removerMascaraDocumento, formatarDocumento, textMaskOperacao } from '../../utils/Mascaras';
import { validarCnpj, validarCpf } from '../../utils/ValidacaoUtils'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Fieldset } from 'bnb-ui/dist'; 
import { Col } from 'bnb-ui/dist';
import { FormatValorMoedaReal, mascaraMonetaria} from '../../utils/Mascaras'
import Info from '../../constants/info';
import Sucess from '../../constants/sucess'
import Message from '../../message'
import DialogSimNao from '../../dialog'






export interface StateParcelamento {
    sistemas: [string, string];
    id: any;
    nome: string;
    documento: string;
    nomeEmpresa: string;
    contato: string;
    operacaoCliente: string;
    open: boolean;
    saldoDevedor:number,
    valorAmortizacao:number,
    saldoDevedorMinimo:number,
    saldoDevedorMaximo:number,
    valorMinimoAmortizacao: number;
    valorMaximoAmortizacao: number;
    valorTarifaMinima: number;
    valorTarifaMaxima: number;
    valorNegociado: number;
    quantidadePacelas:number;
    messageErro: string;
    message: string;
    variant: any;
    objSnack: [string, string];
    keycloak?: any;
    authenticated?: any;
    retorno?: any;
    openSnack?:  any;
   
  }


export default (props: any)=>{

    const [values, setValues] = React.useState<StateParcelamento>({
        sistemas: ['', ''],
        id: '',
        nome: '',
        documento: '',
        nomeEmpresa: '',
        contato: '',
        operacaoCliente: '',
        open: false,
        saldoDevedor:0,
        valorAmortizacao:0,
        saldoDevedorMinimo:0,
        saldoDevedorMaximo:0,
        valorMinimoAmortizacao:0,
       valorMaximoAmortizacao: 0,
        valorTarifaMinima: 0,
        valorTarifaMaxima: 0,
        valorNegociado: 0,
        quantidadePacelas: 0,
        messageErro: '',
        message: '',
        variant: '',
        objSnack: ['', ''],
        keycloak: null,
         authenticated: false,
         retorno: '',
        openSnack: false,

      });

      useEffect(() => {
       console.log(props.match.params.operacaoCliente)
       handleGet()


      },[]);

      const [doc, setDoc] = useState('');
      const [operacao, setOperacao] = useState('');
      const [nomeClie, setNomeClie] = useState('');
      const [tarifaMinima, setTarifaMinima] = useState(0);
      const [tarifaMaxima, setTarifaMaxima] = useState(0);
      const [saldoMaximo, setSaldoMaximo] = useState(0);
      const [saldoMinimo, setSaldoMinimo] = useState(0);
      const [amortizacaoMinima, setAmortizacaoMinima] = useState(0);
      const [amortizacaoMaxima, setAmortizacaoMaxima] = useState(0);
      const [contatos, setContatos] = useState('');
      const [nomeEmpresa, setNomeEmpresa] = useState('');
      const [quantidadeParcelas, setQuantidadeParcelas] = useState(0);
      const [exibirMensagem, setExibirMensagem] = useState('')
      const [exibirModalSucesso, setExibirModalSucesso] = useState(false)
      const [dialogSimNao, setDialogSimNao] = useState(false)
      const [dialogSimNaoMensagem, setDialogSimNaoMensagem] = useState('')
      
      const [amortizacao, setAmortizacao] = useState<AmortizacaoPreviaTO>(new AmortizacaoPreviaTO())

     
 
      async function handleGetSalvarParcelamento() {
        montarParcelamentoSalvar(props)
        await salvarSolicitacaoParcelamento(amortizacao)
        .then((response) => {         
          exibirMensagemSucesso(Info.PARCELAMENTO_CADASTRO_SUCESSO)
          setExibirMensagem(Sucess.PARCELAMENTO_SALVO_SUCESSO)      
        
        }).catch((error) => {
          console.log(error);
                })
      }


      function exibirMensagemSucesso (mensagem: string) {
        setExibirMensagem(mensagem)
        setExibirModalSucesso(true)
      }

      function montarParcelamentoSalvar (response: any) {
       
        amortizacao.codigoOperacao =  operacao;
        amortizacao.cpfCnpj  =  doc;
        amortizacao.dataSolicitacao = new Date();
        amortizacao.nomeCliente = nomeClie;
        amortizacao.nomeEmpresa = nomeEmpresa;
        amortizacao.valorMaximoAmortizacao = amortizacaoMaxima;
        amortizacao.valorMinimoAmortizacao = amortizacaoMinima
        amortizacao.valorTarifa = tarifaMaxima;
        amortizacao.qtdeParcela = values.quantidadePacelas;
        amortizacao.valorNegociadoAmortizacao = values.valorAmortizacao;
         

      }

      async function handleGet() {
       
          try {
           const retorno = await detalharOperacaoCliente(props.match.params.operacaoCliente)
           console.log(retorno)
           setDoc(retorno.cliente.documento);
           setNomeClie(retorno.cliente.nomeCliente)
           setOperacao(retorno.operacaoCliente) 
           setTarifaMinima(retorno.tarifaMinima)
           setTarifaMaxima(retorno.tarifaMaxima)
           setSaldoMaximo(retorno.saldoDevedorMaximo)
           setSaldoMinimo(retorno.saldoDevedorMinimo)
           setAmortizacaoMinima(retorno.amortizacaoMinima)
           setAmortizacaoMaxima(retorno.amortizacaoMaxima) 
           setContatos(retorno.cliente.contatos)
           setNomeEmpresa(retorno.nomeEmpresa)
            
          } catch (error) {
              console.log(error);
              
          }   
        }
     
        async function cancelarSolicitacaoParcelamento () {
          setDialogSimNao(true)
          setDialogSimNaoMensagem('Deseja cancelar?')
        }
         


   
        function retornarMascara() {
          let conteudoDocumento = removerMascaraDocumento(doc);
          if(conteudoDocumento.length > 11) {
            return { inputComponent: textMaskCNPJ as any }
          }else{
            return { inputComponent: textMaskCPF as any }
          }
      }

      const handleChange = (name: keyof StateParcelamento) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
                  ...values,
                  [name]: event.target.value,
          });
      };
     

   
      return (
          <Container>
         <Page pagetitle="Dados de Indentificação do Cliente/Operação" history={props.history}>
    
    <Row>
      
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          id="documento"
          label="CPF/CNPJ"
          value={formatarDocumento(doc.toString())}
         
         
          fullWidth
          autoFocus
          disabled
         
          />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          id="operacao"
          label="Operação"
          value={operacao}
          disabled
          
          fullWidth
          InputProps={{
            inputComponent: textMaskOperacao as any,
          }}
          />
      </Grid>
    </Row>           
    <Row>  
      <Grid item xs={12} md={12}>
        <TextField
          id="nome"
          label="Nome"
          value={nomeClie}
          disabled
          
          fullWidth
            />
      </Grid>
    </Row>

    <Row>  
      <Grid item xs={12} md={12}>
        <TextField
          id="telefone"
          label="Telefone"
          disabled
          value={contatos}
         
         
          fullWidth
            />
      </Grid>
    </Row>
    

    <Fieldset subtitle="Parâmetros de Referencia da Operação">


    <Row>
        <Col sm={6}>
        <TextField id="saldoDevedorMinimo" label="Saldo devedor Mínimo"
        
         value={mascaraMonetaria(saldoMinimo.toString())}
         
         disabled 
         fullWidth
          required />
        </Col>
        <Col sm={6}>
        <TextField id="amortizacaoMinima" label="Amortizacão Prévia Mínima" 
        value={mascaraMonetaria(amortizacaoMinima.toString())}
      
         disabled  fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="tarifaMinima" label="Tarifa Mínima" 
       
        value={mascaraMonetaria(tarifaMinima.toString())}
        disabled 
         fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="saldoDevedorMaximo" label="Saldo devedor Máximo"
        
         value={mascaraMonetaria(saldoMaximo.toString())}
          disabled 
           fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="amortizacaoMaxima" label="Amortizacão Prévia Máxima" 
 
        value={mascaraMonetaria(amortizacaoMaxima.toString())}
         disabled 
          fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="tarifaMaxima" label="Tarifa Máxima"
      
         value={mascaraMonetaria(tarifaMaxima.toString())}
          disabled   fullWidth required />
        </Col>
    </Row>

       
    </Fieldset>


    <Fieldset subtitle="Valores Negociados com o cliente">

    <Row>
        <Col sm={6}>
        <TextField id="amortizacaoPrevia" label="Amortização Prévia"
         value={values.valorAmortizacao}
         onChange={handleChange('valorAmortizacao')}
         variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="saldoDevedor" disabled label="Saldo Devedor" value={values.saldoDevedor} 
          onChange={handleChange('saldoDevedor')}
        variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="quantidadeParcelas" label="Quantidade de Parcelas" value={values.quantidadePacelas} 
         onChange={handleChange('quantidadePacelas')}
         variant="outlined" fullWidth required />
        </Col>
           </Row>
       
    </Fieldset>
   
                    <DialogActions>
                        <Buttons  variant="contained" color="primary" autoFocus onClick={()=> cancelarSolicitacaoParcelamento()} >Cancelar</Buttons>
                        <Buttons variant="contained" color="primary" autoFocus onClick={()=> handleGetSalvarParcelamento()}>Submeter</Buttons>
                    </DialogActions>
      

  <Snack variant={values.variant} message={values.message} open={values.openSnack} ></Snack>
  
</Page>

        <Message
        exibir={exibirModalSucesso}
        setExibir={setExibirModalSucesso}
        mensagem={exibirMensagem} />

      <DialogSimNao
        exibir={dialogSimNao}
        setExibir={setDialogSimNao}
        mensagem={dialogSimNaoMensagem}
        sim={() => {
          setDialogSimNao(false)
        }}
        nao={() => {
          setDialogSimNao(false)
                 
        }} />
          
          </Container>
      )
       
}
