import React, {useState, useEffect , ChangeEvent} from "react";
import { Container, Snack, Load, Buttons, Row, Page, Fieldset, AutoComplete, ButtonGroup } from 'bnb-ui/dist'
import EditFields from '../../Components/EditFields';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { IconButton, Tooltip, Grid, TextField, FormControlLabel, Checkbox  } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Keycloak from 'keycloak-js';

import SearchIcon from '@material-ui/icons/SearchOutlined'
import GetAppIcon from '@material-ui/icons/GetApp'
import PublishIcon from '@material-ui/icons/Publish';
import MaskedInput from 'react-text-mask';

import { consultarOperacoes, consultarOperacoesFiltro } from '../../providers/OperacoesProvider'
import OperacaoTO from '../../models/OperacaoTO' 

export interface StateListarOperacoes {
  sistemas: [string, string];
  id: any;
  operacao: string;
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

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskOperacao(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props;

  return (
          <MaskedInput
                  {...other}
                  ref={(ref: any) => {
                          inputRef(ref ? ref.inputElement : null);
                  }}
                  mask={[/\d/, '.',/\d/,/\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/]}
                  placeholderChar={'\u2000'}
                  showMask
          />
  );
}

export default function ListarOperacoes(props: any) {

  const [values, setValues] = React.useState<StateListarOperacoes>({
    sistemas: ['', ''],
    id: '',
    operacao: '',
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

  useEffect(() => {
    props.history.push({
      pathname: '/ListarOperacoes',
      state: values.objSnack,
    })
    handleGet();

    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }

  }, [])

  // componentDidMount() {

  //   // const keycloak = Keycloak('./keycloak.json');
  //   // keycloak.init({ onLoad: 'login-required', flow: 'implicit' }).success(authenticated => {
  //   //   this.setState({ keycloak: keycloak, authenticated: authenticated });

  //   //   localStorage.setItem('authenricated', this.state.authenticated);
  //   //   localStorage.setItem('keycloak', this.state.keycloak.token);
      
  //   //   console.log(keycloak);
  //   //   console.log(authenticated);
  //   //   if(this.props.location.state){
  //   //     if (this.props.location.state[0] != '') {
  //   //       this.setState({ variant: this.props.location.state[0], message: this.props.location.state[1] });
  //   //       this.setState({ open: true });
  //   //     }
  //   //   }
  //     this.props.history.push({
  //       pathname: '/ListarOperacoes',
  //       state: this.state.objSnack,
  //     })
  //     this.handleGet();

  //   // }).error(() => {
  //   //   this.setState({variant:'error'});
  //   //   console.log(this.state.variant);
  //   //   this.setState({message:'O usuÃ¡rio nÃ£o tem permissÃ£o para executar essa tarefa.'});
  //   //   this.setState({open: true})
  //   // });
  // };

  async function handleGet() {
      try {

        await consultarOperacoesFiltro(values.operacao, values.documento, values.nome)
          .then((response) => {
            const lista = response
            const data: any[] = [];
      
            lista.map(
              (
                x: { 
                  id: any; 
                  operacao: any;
                  documento: any; 
                  nome: any; 
                }
              ) => data.push(
                      { 
                        'Id': x.id, 
                        'Operação': x.operacao,
                        'CPF/CNPJ': x.documento,
                        'Nome': x.nome,  
                      }
                    )
            );
            setData(data)
          })
        
      } catch (error) {
          console.log(error);
          setData([])
          // erroLoadMensagem(Error.MSG_ERROR_SERVICO_INDISPONIVEL, 'Serviço indisponível')
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

  const listaOpcoes: any = {
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
                value={values.documento}
                onChange={handleChange('documento')}
                variant="outlined"
                fullWidth
                />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                id="operacao"
                label="Operação"
                value={values.operacao}
                onChange={handleChange('operacao')}
                variant="outlined"
                fullWidth
                InputProps={{
                  inputComponent: TextMaskOperacao as any,
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


