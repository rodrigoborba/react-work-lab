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

export interface StateListarOperacoes {
  sistemas: [string, string];
  id: any;
  operacaoCliente: string;
  documento: string;
  nome: string;
  audio: string;
  termo: string;
  textmask: string;
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
    textmask: '(  )    -    ',
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

  const [data, setData] = useState<OperacaoTO[]>([])

  const [doc, setDoc] = useState('');

  useEffect(() => {
    init('login-required', 'implicit' )

  }, [])

  const handleChangeDoc = (e: any) => {
    setDoc(e.currentTarget.value);
  };

  async function handleGet() {
      try {
        await consultarOperacoesCarteiraFiltro(values.operacaoCliente, values.documento, values.nome)
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
                  <IconButton>
                    <PublishIcon />
                  </IconButton>
                </Tooltip>
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


