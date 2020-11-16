import React, {useState, useEffect } from "react";
import { Container, Snack, Buttons, Row, Page } from 'bnb-ui/dist'
import MUIDataTable from 'mui-datatables';
import { IconButton, Tooltip, Grid, TextField  } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/SearchOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'
import PublishIcon from '@material-ui/icons/Publish';

import { consultarOperacoesCarteiraFiltro } from '../../providers/OperacoesProvider'
import OperacaoTO from '../../models/OperacaoTO' 
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
        valorMinimoAmortizacao: 0,
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



      },[]);

      const [doc, setDoc] = useState('');

      const handleChangeDoc = (e: any) => {
        setDoc(e.currentTarget.value);
      };


      function retornarMascara() {
        let conteudoDocumento = removerMascaraDocumento(doc);
        if(conteudoDocumento.length > 11) {
          return { inputComponent: textMaskCNPJ as any }
        }else{
          return { inputComponent: textMaskCPF as any }
        }
    }

   
      return (
          <Container>
         <Page pagetitle="Dados de Indentificação do Cliente/Operação" history={props.history}>
    
    <Row>
      
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          id="documento"
          label="CPF/CNPJ"
          value={doc}
          onChange={handleChangeDoc}
          variant="outlined"
          fullWidth
          autoFocus
          disabled
          InputProps={
            retornarMascara()
            }
          />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          id="operacao"
          label="Operação"
          value={values.operacaoCliente}
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
          id="nome"
          label="Nome"
          value={values.nome}
          disabled
          variant="outlined"
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
          value={values.nome}
         
          variant="outlined"
          fullWidth
            />
      </Grid>
    </Row>
    

    <Fieldset subtitle="Parâmetros de Referencia da Operação">


    <Row>
        <Col sm={6}>
        <TextField id="saldoDevedorMinimo" label="Saldo devedor Mínimo" value={values.saldoDevedorMinimo} disabled  variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="amortizacaoMinima" label="Amortizacão Prévia Mínima" value={values.valorMinimoAmortizacao}  disabled  variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="tarifaMinima" label="Tarifa Mínima" value={values.valorTarifaMinima} disabled variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="saldoDevedorMaximo" label="Saldo devedor Máximo" value={values.saldoDevedorMaximo}  disabled variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="amortizacaoMaxima" label="Amortizacão Prévia Máxima" value={values.valorMaximoAmortizacao} disabled variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="tarifaMaxima" label="Tarifa Máxima" value={values.valorTarifaMaxima} disabled  variant="outlined" fullWidth required />
        </Col>
    </Row>

       
    </Fieldset>


    <Fieldset subtitle="Valores Negociados com o cliente">

    <Row>
        <Col sm={6}>
        <TextField id="amortizacaoPrevia" label="Amortização Prévia" value={values.saldoDevedor} disabled  variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="saldoDevedor" label="Saldo Devedor" value={values.valorAmortizacao}  disabled  variant="outlined" fullWidth required />
        </Col>
        <Col sm={6}>
        <TextField id="quantidadeParcelas" label="Quantidade de Parcelas" value={values.quantidadePacelas} disabled variant="outlined" fullWidth required />
        </Col>
           </Row>
       
    </Fieldset>
   
                    <DialogActions>
                        <Buttons  variant="contained" color="primary" >Cancelar</Buttons>
                        <Buttons variant="contained" color="primary" autoFocus>Submeter</Buttons>
                    </DialogActions>
      

  <Snack variant={values.variant} message={values.message} open={values.openSnack} ></Snack>
  
</Page>
          
          </Container>
      )
       
}
