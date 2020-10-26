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

import './style.css'

export interface StateListarOperacoes {
  sistemas: [string, string];
  id: any;
  operacaoCliente: string;
  documento: string;
  nome: string;
  audio: string;
  termo: string;
  open: boolean;
  messageErro: string;
  message: string;
  variant: any;
  objSnack: [string, string];
  keycloak?: any;
  authenticated?: any;
  retorno?: any;
  openSnack?:  any;
}

export default function ListarOperacoes(props: any) {

  const [values, setValues] = React.useState<StateListarOperacoes>({
    sistemas: ['', ''],
    id: '',
    operacaoCliente: '',
    documento: '',
    nome: '',
    audio: '',
    termo: '',
    open: false,
    messageErro: '',
    message: '',
    variant: '',
    objSnack: ['', ''],
    keycloak: null,
    authenticated: false,
    retorno: '',
    openSnack: false,
  });

  const handleChange = (name: keyof StateListarOperacoes) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
              ...values,
              [name]: event.target.value,
      });
  };

  const [doc, setDoc] = useState('');

  const handleChangeDoc = (e: any) => {
    setDoc(e.currentTarget.value);
  };

  const [data, setData] = useState<OperacaoTO[]>([])

  const [open, setOpen] = useState(false);

  useEffect(() => {
    init('login-required', 'implicit' )

  }, [])

  function validarDocumento(){
    let documento = removerMascaraDocumento(doc);
    let documentoValido = true;
    if(null != documento && documento != ""){
      if(documento.length <= 11){
        documentoValido = validarCpf(documento);
      }else{
        documentoValido = validarCnpj(documento);
      }
    }
    return documentoValido;
  }

  async function handleGet() {
      if(validarDocumento()){
        try {
          await consultarOperacoesCarteiraFiltro(values.operacaoCliente, doc, values.nome)
            .then((response) => {
              const lista = response
              
              const data: any[] = [];
              
              if(lista != null && null == lista.code){
                lista.map(
                  (
                    x: { 
                      id: any; 
                      operacaoCliente: any;
                      cliente: any; 
                    }
                  ) => data.push(
                          { 
                            'Id': x.id, 
                            'Operação': x.operacaoCliente,
                            'CPF/CNPJ': formatarDocumento(x.cliente.documento),
                            'Nome': x.cliente.nomeCliente,  
                          }
                        )
                );
              }
              setData(data)
            })
          
        } catch (error) {
            console.log(error);
            setData([])
        }   
      }else{
        setOpen(true);
      }
      
  }

  function retornarMascara() {
      let conteudoDocumento = removerMascaraDocumento(doc);
      if(conteudoDocumento.length > 11) {
        return { inputComponent: textMaskCNPJ as any }
      }else{
        return { inputComponent: textMaskCPF as any }
      }
  }

  const columns: any = [
    {
      name: "Operação",
      options: {
        filter: true,
        align: 'right'
      }
    },
    {
      name: "CPF/CNPJ",
      options: {
        filter: true,
      }
    },
    {
      name: "Nome",
      options: {
        filter: true,
      }
    },
    {
      name: "Áudio",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: { rowIndex: any; }, updateValue: any) => {
          return (
            <div>
                <Tooltip title={"Enviar"}>
                  <IconButton className="iconButtonOperacoes">
                    <PublishIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Download"}>
                  <IconButton className="iconButtonOperacoes">
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
            </div>
          );
        }
      }
    },
    {
      name: "Termo",
      options: {
        filter: true,
        customBodyRender: (value: any, tableMeta: { rowIndex: any; }, updateValue: any) => {
          return (
            <div>
                <Tooltip title={"Download"}>
                  <IconButton>
                    <GetAppIcon />
                  </IconButton>
                </Tooltip>
            </div>
          );
        }
      }
    },
  ];

  const options: any = {
    filterType: 'none',
    responsive: 'scrollFullHeight',
    selectableRowsHeader: false,
    search: false,
    download: false,
    print: false,
    filter:false,
    viewColumns:false,
    textLabels: {
      body: {
        noMatch: "Nenhum registro encontrado",
        toolTip: "Sort",
      },
      pagination: {
        next: "Próxima página",
        previous: "Página Anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
      },
      filter: {
        all: "Tudo",
        title: "FILTROS",
        reset: "LIMPAR",
      },
    }
  };

    
  return (
    <Container>
      <Page pagetitle="Listar Operações" history={props.history}>

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
                onChange={handleChange('operacaoCliente')}
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
                onChange={handleChange('nome')}
                variant="outlined"
                fullWidth
                  />
            </Grid>
          </Row>

          <Row>
            <Grid item xs={12} md={12}>
              <Buttons variant='outlined' color='secondary' onClick={()=> handleGet()}>
                <SearchIcon />
                  Pesquisar
              </Buttons>
              <Dialog
                    fullScreen={props.fullScreen}
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                            <DialogContentText>
                                CPF/CNPJ inválido.
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={() => setOpen(false)}>
                            Fechar
                          </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
          </Row>          

            

        <Snack variant={values.variant} message={values.message} open={values.openSnack} ></Snack>
        <MUIDataTable
          title={""}
          data={data}
          columns={columns}
          options={options}
        />
      </Page>
    </Container>
  );
}


