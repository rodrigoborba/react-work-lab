import React, {useState, useEffect } from "react";

import { Container, Snack, Buttons, Row, Page, Load, Fieldset, Col } from 'bnb-ui/dist'

import { TextField } from '@material-ui/core';

import { createBrowserHistory } from 'history';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Info from '../../constants/info';
import Sucess from '../../constants/sucess'
import Message from '../../Components/mensagens/message'
import DialogSimNao from '../../Components/mensagens/dialog'

import { detalharOperacaoCliente, salvarSolicitacaoParcelamento } from '../../providers/ParcelamentoProvider'
import AmortizacaoPreviaTO from '../../models/AmortizacaoPreviaTO'
import { formatarDocumento, textMaskOperacao, formatarValorMoedaReal, mascaraMonetaria, removerMascaraMonetaria } from '../../utils/Mascaras';
import { validarParcelas, validarValorAmortizacaoPrevia, retornarSaldoDevedor } from '../../services/ParcelamentoService'

const theme = require('./style.css');

export interface StateParcelamento {
  nome: string;
  documento: string;
  nomeEmpresa: string;
  contato: string;
  operacaoCliente: string;
  open: boolean;
  saldoDevedor:number,
  valorAmortizacao: any,
  saldoDevedorMinimo:number,
  saldoDevedorMaximo:number,
  valorMinimoAmortizacao: number;
  valorMaximoAmortizacao: number;
  valorTarifaMinima: number;
  valorTarifaMaxima: number;
  valorNegociado: number;
  quantidadePacelas: any;
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

    const useStyles = makeStyles({
      table: {
      },
    });

    const classes = useStyles();

    const history = createBrowserHistory();

    const [values, setValues] = React.useState<StateParcelamento>({
        nome: '',
        documento: '',
        nomeEmpresa: '',
        contato: '',
        operacaoCliente: '',
        open: false,
        saldoDevedor:0,
        valorAmortizacao: undefined,
        saldoDevedorMinimo:0,
        saldoDevedorMaximo:0,
        valorMinimoAmortizacao:0,
        valorMaximoAmortizacao: 0,
        valorTarifaMinima: 0,
        valorTarifaMaxima: 0,
        valorNegociado: 0,
        quantidadePacelas: undefined,
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
      const [amortizacao, setAmortizacao] = useState<AmortizacaoPreviaTO>(new AmortizacaoPreviaTO())

      const [exibirMensagem, setExibirMensagem] = useState('')
      const [exibirModalSucesso, setExibirModalSucesso] = useState(false)
      const [exibirMensagemInfo, setExibirMensagemInfo] = useState('')
      const [exibirModalInfo, setExibirModalInfo] = useState(false)
      const [dialogSimNao, setDialogSimNao] = useState(false)
      const [dialogSimNaoMensagem, setDialogSimNaoMensagem] = useState('')

      const [errorMessage, setErrorMessage] = useState('');
      const [validationMessageOpen, setValidationMessageOpen] = useState(false);
      const [errors, setErrors] = useState({ valorAmortizacao: '', quantidadePacelas: '' });

      const [exibirLoad, setExibirLoad] = useState(true);


      const validate = (fieldValues = values) => {
          let temp = { valorAmortizacao: "", quantidadePacelas: "" }
          if ('quantidadePacelas' in fieldValues){
            temp.quantidadePacelas = fieldValues.quantidadePacelas ? "" : "Este campo é obrigatório."  
          }
              
          if ('valorAmortizacao' in fieldValues){
              temp.valorAmortizacao = fieldValues.valorAmortizacao ? "" : "Este campo é obrigatório."
          }
          setErrors({
              ...temp
          })

          if (fieldValues === values){
              return Object.values(temp).every(item => item === "")
          }
      }

      function validarCriterios(valorAmortizacao : number, quantidadeParcelas: number) : boolean {
        
        let retornoValidacaoAmortizacao = validarValorAmortizacaoPrevia(
                                              valorAmortizacao,
                                              amortizacaoMinima,
                                              tarifaMinima,
                                              saldoMaximo);

        if(!retornoValidacaoAmortizacao.valido){
          setErrorMessage(retornoValidacaoAmortizacao.mensagem);
        }

        let retornoValidacaoParcelas = validarParcelas(quantidadeParcelas);
        if(!retornoValidacaoParcelas.valido){
          setErrorMessage(retornoValidacaoParcelas.mensagem);
        }

        return retornoValidacaoAmortizacao.valido &&  retornoValidacaoParcelas.valido;
      }

      async function handleSalvarParcelamento() {
        if(validate()){
          if(validarCriterios(values.valorAmortizacao, values.quantidadePacelas)){
            montarParcelamentoSalvar(props)
            await salvarSolicitacaoParcelamento(amortizacao)
            .then((response) => {
              setExibirMensagem(Sucess.PARCELAMENTO_SALVO_SUCESSO)
              setExibirModalSucesso(true)

            }).catch((error) => {
              tratarErro(error);
            })
          }else{
            setValidationMessageOpen(true);
          }
        }

      }

      async function handleGet() {

        try {
          const retorno = await detalharOperacaoCliente(props.match.params.operacaoCliente)
          setDoc(retorno.cliente.documento);
          setNomeClie(retorno.cliente.nomeCliente)
          setOperacao(retorno.operacaoCliente)
          setTarifaMinima(retorno.tarifaMinima ? retorno.tarifaMinima: 0)

          setTarifaMaxima(retorno.tarifaMaxima ? retorno.tarifaMaxima: 0)
          setSaldoMaximo(retorno.saldoDevedorMaximo ? retorno.saldoDevedorMaximo: 0)
          setSaldoMinimo(retorno.saldoDevedorMinimo ? retorno.saldoDevedorMinimo: 0)
          setAmortizacaoMinima(retorno.amortizacaoMinima ? retorno.amortizacaoMinima: 0)
          setAmortizacaoMaxima(retorno.amortizacaoMaxima ? retorno.amortizacaoMaxima: 0)
          setContatos(retorno.cliente.contatos)
          setNomeEmpresa(retorno.nomeEmpresa)
          setExibirLoad(false)

        } catch (error) {
            setExibirLoad(false)
            tratarErro(error)
        }
      }

      const handleChange = (name: keyof StateParcelamento) => (event: React.ChangeEvent<HTMLInputElement>) => {
          setValues({
                  ...values,
                  [name]: event.target.value,
          });
      };

      const handleBlurAmortizacao = (event: any) => (event: React.FocusEvent<HTMLInputElement>) => {
        let valorFormatado = mascaraMonetaria(event.target.value);
        let valorParaCalculoSaldoDevedor:string = valorFormatado!; 
        setValues({
          ...values,
          saldoDevedor: retornarSaldoDevedor(removerMascaraMonetaria(valorParaCalculoSaldoDevedor)),
          valorAmortizacao: valorFormatado,
        });
      };

      function limpar(value: string){
        setDialogSimNao(false)
        setValues({
          ...values,
          quantidadePacelas: undefined,
          valorAmortizacao: undefined,
        });
        if(value === 'retornar'){
          handleGoBack();
        }
      }

      function handleGoBack(){
        console.log(history)
        history.goBack()
      }

      function montarParcelamentoSalvar (response: any) {

        amortizacao.codigoOperacao =  operacao;
        amortizacao.cpfCnpj  =  doc;
        amortizacao.dataSolicitacao = new Date();
        amortizacao.nomeCliente = nomeClie;
        amortizacao.nomeEmpresa = nomeEmpresa;
        amortizacao.valorMaximoAmortizacao = amortizacaoMaxima;
        amortizacao.valorMinimoAmortizacao = amortizacaoMinima;
        amortizacao.valorTarifaMinima = tarifaMinima;
        amortizacao.valorTarifaMaxima = tarifaMaxima;
        amortizacao.qtdeParcela = values.quantidadePacelas;
        let valorParaCalculo:number = removerMascaraMonetaria(values.valorAmortizacao)!; 
        amortizacao.valorNegociadoAmortizacao = valorParaCalculo;
        amortizacao.valorSaldoDevedor = values.saldoDevedor;

      }

      function tratarErro(error : any){
        setExibirMensagemInfo(Info.ERRO_DESCONHECIDO)
        setExibirModalInfo(true)
      }

      async function cancelarSolicitacaoParcelamento () {
        setDialogSimNao(true)
        setDialogSimNaoMensagem('Deseja cancelar?')
      }

      function createRow(descricao: string, valor: string) {
        return { descricao, valor};
      }

      const rowsMinimo = [
        createRow('Saldo devedor', formatarValorMoedaReal(saldoMinimo)),
        createRow('Amortização Prévia', formatarValorMoedaReal(amortizacaoMinima)),
        createRow('Tarifa', formatarValorMoedaReal(tarifaMinima)),
      ];

      const rowsMaximo = [
        createRow('Saldo devedor', formatarValorMoedaReal(saldoMaximo)),
        createRow('Amortização Prévia', formatarValorMoedaReal(amortizacaoMaxima)),
        createRow('Tarifa', formatarValorMoedaReal(tarifaMaxima)),
      ];

      return (
          <Container>
            
            <Page pagetitle="Solicitação de Parcelamento" history={props.history}>


            <form >
              <Fieldset subtitle="Dados de Identificação do Cliente/operação" 
                theme={theme}> 

                  <Row>
                    <Col sm={12}>
                    <TextField
                        id="nome"
                        label="Nome do Cliente"
                        value={nomeClie}
                        disabled
                        variant="outlined"
                        fullWidth
                          />
                    </Col>
                  </Row>

                  <Row>

                    <Col sm={6}>
                      <TextField
                        id="documento"
                        label="CPF/CNPJ"
                        value={formatarDocumento(doc.toString())}

                        variant="outlined"
                        fullWidth
                        autoFocus
                        disabled

                        />
                    </Col>
                    <Col sm={6}>
                      <TextField
                        id="operacao"
                        label="Operação"
                        value={operacao}
                        disabled
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          inputComponent: textMaskOperacao as any,
                        }}
                        />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6}>
                      <TextField
                        id="telefone"
                        label="Telefone Cliente"
                        disabled
                        value={contatos}
                        variant="outlined"
                        fullWidth
                          />
                    </Col>
                  </Row>
              </Fieldset>            

              <Fieldset subtitle="Parâmetros de Referência da Operação">

                <Row>
                  <Col sm={6}>

                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" colSpan={2}>
                              Valor Mínimo
                            </TableCell>
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowsMinimo.map((row) => (
                            <TableRow key={row.descricao}>
                              <TableCell align="left">{row.descricao}</TableCell>
                              <TableCell align="center">{row.valor}</TableCell>
                            </TableRow>
                          ))}

                          
                        </TableBody>
                      </Table>
                    </TableContainer> 

                    </Col>        

                    <Col sm={6}>

                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="spanning table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" colSpan={2}>
                              Valor Máximo
                            </TableCell>
                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowsMaximo.map((row) => (
                            <TableRow key={row.descricao}>
                              <TableCell align="left">{row.descricao}</TableCell>
                              <TableCell align="center">{row.valor}</TableCell>
                            </TableRow>
                          ))}

                          
                        </TableBody>
                      </Table>
                    </TableContainer> 

                    </Col>    
                </Row>

              </Fieldset>

              <div style={{display: exibirLoad ? 'block': 'none'}}> <Load /> </div>
              <Fieldset subtitle="Valores Negociados com o Cliente">
                      
                <Row>
                  <Col sm={6}>
                    <TextField id="amortizacaoPrevia" label="Amortização Prévia"
                      value={values.valorAmortizacao || ''}
                      placeholder="Preencher..."
                      autoFocus
                      onChange={handleChange('valorAmortizacao')}
                      onBlur={handleBlurAmortizacao(values.valorAmortizacao)}
                      error={errors.valorAmortizacao? true: false}
                      helperText={errors.valorAmortizacao}
                      variant="outlined" fullWidth required 
                      />
                  </Col>

                  <Col sm={6}>
                    <TextField id="saldoDevedor" 
                      disabled 
                      label="Saldo Devedor" 
                      value={formatarValorMoedaReal(values.saldoDevedor)}
                      variant="outlined" fullWidth />
                  </Col>
                </Row> 

                  <Row>              
                  <Col sm={6}>
                    <TextField id="quantidadeParcelas" label="Quantidade de Parcelas" 
                      value={values.quantidadePacelas || ''}
                      placeholder="Preencher..."
                      type="number"
                      onChange={handleChange('quantidadePacelas')}
                      error={errors.quantidadePacelas? true: false}
                      helperText={errors.quantidadePacelas}
                      variant="outlined" fullWidth required />
                  </Col>
                </Row>          


              </Fieldset>

              </form>

              <Dialog
                      fullScreen={props.fullScreen}
                      open={validationMessageOpen}
                      onClose={() => setValidationMessageOpen(false)}
                      aria-labelledby="responsive-dialog-title">

                      <DialogContent>
                              <DialogContentText>
                                {errorMessage}
                              </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                          <Button color="secondary" onClick={() => setValidationMessageOpen(false)}>
                              Fechar
                            </Button>
                      </DialogActions>
                </Dialog>

                <DialogActions>
                    <Buttons  variant="contained" color="primary" autoFocus onClick={()=> cancelarSolicitacaoParcelamento()} >Cancelar</Buttons>
                    <Buttons variant="contained" color="primary" autoFocus onClick={()=> handleSalvarParcelamento()}>Submeter</Buttons>
                </DialogActions>


              <Snack variant={values.variant} message={values.message} open={values.openSnack} ></Snack>

            </Page>

          <Message
            exibir={exibirModalInfo}
            tipoErro
            setExibir={setExibirModalInfo}
            mensagem={exibirMensagemInfo} />  

          <Message
            exibir={exibirModalSucesso}
            setExibir={setExibirModalSucesso}
            mensagem={exibirMensagem} />

          <DialogSimNao
            exibir={dialogSimNao}
            setExibir={setDialogSimNao}
            mensagem={dialogSimNaoMensagem}
            sim={() => {
              limpar('')
            }}
            nao={() => {
              setDialogSimNao(false)

            }} />

          </Container>
      )

}
