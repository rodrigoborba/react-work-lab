import React, {useState, useEffect } from "react";
import { Container, Snack, Buttons, Row, Page } from 'bnb-ui/dist'
import { Grid, TextField } from '@material-ui/core';

import { detalharOperacaoCliente, salvarSolicitacaoParcelamento } from '../../providers/ParcelamentoProvider'
import AmortizacaoPreviaTO from '../../models/AmortizacaoPreviaTO'
import { init } from '../../Components/seguranca/Auth'
import { formatarDocumento, textMaskOperacao } from '../../utils/Mascaras';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { Fieldset } from 'bnb-ui/dist';
import { Col } from 'bnb-ui/dist';
import { FormatValorMoedaReal } from '../../utils/Mascaras'
import Info from '../../constants/info';
import Sucess from '../../constants/sucess'
import Message from '../../Components/mensagens/message'
import DialogSimNao from '../../Components/mensagens/dialog'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { validarParcelas, validarValorAmortizacaoPrevia, retornarSaldoDevedor } from '../../services/ParcelamentoService'

const theme = require('./style.css');

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
      const [exibirMensagem, setExibirMensagem] = useState('')
      const [exibirModalSucesso, setExibirModalSucesso] = useState(false)
      const [dialogSimNao, setDialogSimNao] = useState(false)
      const [dialogSimNaoMensagem, setDialogSimNaoMensagem] = useState('')

      const [amortizacao, setAmortizacao] = useState<AmortizacaoPreviaTO>(new AmortizacaoPreviaTO())

      const [errorMessage, setErrorMessage] = useState('');

      const [validationMessageOpen, setValidationMessageOpen] = useState(false);

      const [errors, setErrors] = useState({ valorAmortizacao: '', quantidadePacelas: '' });

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

          if (fieldValues == values)
              return Object.values(temp).every(item => item == "")
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

      async function handleGetSalvarParcelamento() {
        if(validate()){
          if(validarCriterios(values.valorAmortizacao, values.quantidadePacelas)){
            montarParcelamentoSalvar(props)
            await salvarSolicitacaoParcelamento(amortizacao)
            .then((response) => {
              exibirMensagemSucesso(Info.PARCELAMENTO_CADASTRO_SUCESSO)
              setExibirMensagem(Sucess.PARCELAMENTO_SALVO_SUCESSO)
  
            }).catch((error) => {
              console.log(error);
            })
          }else{
            setValidationMessageOpen(true);
          }
        }

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
        amortizacao.valorMinimoAmortizacao = amortizacaoMinima;
        amortizacao.valorTarifaMinima = tarifaMinima;
        amortizacao.valorTarifaMaxima = tarifaMaxima;
        amortizacao.qtdeParcela = values.quantidadePacelas;
        amortizacao.valorNegociadoAmortizacao = values.valorAmortizacao;
        amortizacao.valorSaldoDevedor = values.saldoDevedor;

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

        } catch (error) {
            console.log(error);

        }
      }

      async function cancelarSolicitacaoParcelamento () {
        setDialogSimNao(true)
        setDialogSimNaoMensagem('Deseja cancelar?')
      }

      const handleChange = (name: keyof StateParcelamento) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if(name == 'valorAmortizacao'){
          setValues({
            ...values,
            saldoDevedor: retornarSaldoDevedor(event.target.value),
            [name]: event.target.value,
          });
        }else{
          setValues({
                  ...values,
                  [name]: event.target.value,
          });
        }  
      };

      function createRow(descricao: string, valor: string) {
        return { descricao, valor};
      }

      const rowsMinimo = [
        createRow('Saldo devedor', FormatValorMoedaReal(saldoMinimo)),
        createRow('Amortização Prévia', FormatValorMoedaReal(amortizacaoMinima)),
        createRow('Tarifa', FormatValorMoedaReal(tarifaMinima)),
      ];

      const rowsMaximo = [
        createRow('Saldo devedor', FormatValorMoedaReal(saldoMaximo)),
        createRow('Amortização Prévia', FormatValorMoedaReal(amortizacaoMaxima)),
        createRow('Tarifa', FormatValorMoedaReal(tarifaMaxima)),
      ];

      return (
          <Container>
            <Page pagetitle="Solicitação de Parcelamento" history={props.history}>


            <form >
              <Fieldset subtitle="Dados de Identificação do Cliente/operação" 
                theme={theme}> 

                  <Row>
                    <Grid item xs={12} md={12} lg={12}>
                    <TextField
                        id="nome"
                        label="Nome do Cliente"
                        value={nomeClie}
                        disabled
                        variant="outlined"
                        fullWidth
                          />
                    </Grid>
                  </Row>

                  <Row>

                    <Grid item xs={12} md={6} lg={6}>
                      <TextField
                        id="documento"
                        label="CPF/CNPJ"
                        value={formatarDocumento(doc.toString())}

                        variant="outlined"
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
                        variant="outlined"
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
                        id="telefone"
                        label="Telefone Cliente"
                        disabled
                        value={contatos}
                        variant="outlined"
                        fullWidth
                          />
                    </Grid>
                  </Row>
              </Fieldset>            

              <Fieldset subtitle="Parâmetros de Referência da Operação">

                <Row>
                  <Grid item xs={6} md={6} lg={6}>

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

                    </Grid>        

                    <Grid item xs={6} md={6} lg={6}>

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

                    </Grid>    
                </Row>

              </Fieldset>


              <Fieldset subtitle="Valores Negociados com o Cliente">
                      
                <Row>
                  <Col sm={6}>
                    <TextField id="amortizacaoPrevia" label="Amortização Prévia"
                      value={values.valorAmortizacao}
                      placeholder="Preencher..."
                      autoFocus
                      onChange={handleChange('valorAmortizacao')}
                      error={errors.valorAmortizacao? true: false}
                      helperText={errors.valorAmortizacao}
                      variant="outlined" fullWidth required />
                  </Col>

                  <Col sm={6}>
                    <TextField id="saldoDevedor" 
                      disabled 
                      label="Saldo Devedor" 
                      value={FormatValorMoedaReal(values.saldoDevedor)}
                      variant="outlined" fullWidth />
                  </Col>
                </Row> 

                  <Row>              
                  <Col sm={6}>
                    <TextField id="quantidadeParcelas" label="Quantidade de Parcelas" 
                      value={values.quantidadePacelas}
                      placeholder="Preencher..."
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
