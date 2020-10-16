import React, {useState, ChangeEvent} from "react";
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

import OperacoesProvider from '../../providers/OperacoesProvider'
import OperacaoTO from '../../models/OperacaoTO' 

import styles from './style.module.css'

export interface PropsListarOperacoes {
  history?: any;
  snackalert?: any;
  location?: any;
}

export interface StateListarOperacoes {
  sistemas: [string, string];
  data: any[];
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

export default class ListarOperacoes extends React.Component<PropsListarOperacoes, StateListarOperacoes>{

  private readonly _service = new OperacoesProvider();

  constructor(props: PropsListarOperacoes) {
    super(props);
    this.state = {
      sistemas: ['', ''],
      data: [],
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
    };

  }
  

  componentDidMount() {

    const keycloak = Keycloak('./keycloak.json');
    //keycloak.init({ onLoad: 'login-required', flow: 'implicit' }).success(authenticated => {
      //this.setState({ keycloak: keycloak, authenticated: authenticated });

      //localStorage.setItem('authenricated', this.state.authenticated);
      //localStorage.setItem('keycloak', this.state.keycloak.token);
      
      //console.log(keycloak);
      //console.log(authenticated);
      if(this.props.location.state){
        if (this.props.location.state[0] != '') {
          this.setState({ variant: this.props.location.state[0], message: this.props.location.state[1] });
          this.setState({ open: true });
        }
      }
      this.props.history.push({
        pathname: '/ListarOperacoes',
        state: this.state.objSnack,
      })
      this.handleGet();

    /*}).error(() => {
      this.setState({variant:'error'});
      console.log(this.state.variant);
      this.setState({message:'O usuÃ¡rio nÃ£o tem permissÃ£o para executar essa tarefa.'});
      this.setState({open: true})
    });*/
  };


  handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') (
      this.setState({ open: false })
    )

    this.setState({ open: false });

  };

  async handleGet2() {
      try {
          //this.setState({...this.state, exibirLoading: true})
          this.refresh();
          /*
          this.setState({...this.state, exibirLoading: false, municipios: listaMunicipios
          })*/
      } catch (error) {
          console.log(error);
      }   
  }

  async refresh(description = '') {
  /*  let tipo = this.state.tipoFiltro.value;
    let municipio = this.state.municipioSelecionado.codigo;
    let inicio = this.state.inicioDataPrevisaoExclusao;
    let fim = this.state.fimDataPrevisaoExclusao;*/
    const lista = await this._service.consultarOperacoes()
    const listaOperacoes: any[] = [];
                
    lista.data.forEach((operacao: OperacaoTO) => {
        listaOperacoes.push(
            {
                'id': operacao.id,
                'documento': operacao.documento,
                'nome': operacao.nome,
                'audio': operacao.audio,
                'termo': operacao.termo,
            }
        )
    })
    this.setState({data: listaOperacoes})
      
  }

  handleGet = () => {
    let config = null;
    /*let config = {
      headers: { 'Authorization': "Bearer " + this.state.keycloak.token }
    };*/
    axios.get(`https://5f86e13cc8a16a0016e6bd9f.mockapi.io/s549-parcelamento-servico/v1/operacoes`)
      .then(res => {
        const itens = res.data;
        const data: any[] = [];
        itens.map(
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
        this.setState({ data });

      })
      .catch(error => {
        this.setState({ messageErro: error });
        if (error.response.status === 403) {
          this.setState({variant:'error'});
          this.setState({message:'O usuÃ¡rio nÃ£o tem permissÃ£o para executar essa tarefa.'});
          this.setState({ openSnack: true });
        }
      });
  }

  handleClickIndex = (index: any) => (
    <EditFields>{index}</EditFields>
  );

  handleChange = (event: any) => {
    this.setState({ 
      documento: event.target.value,
      nome: event.target.value,
      operacao: event.target.value  
     });
  }

  render() {
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
                <Link to={'/EditFields/' + this.state.data[tableMeta.rowIndex].Id} style={{ textDecoration: 'none' }} aria-label="EdiÃ§Ã£o">
                  <Tooltip title={"Enviar"}>
                    <IconButton>
                      <PublishIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link to={'/EditFields/' + this.state.data[tableMeta.rowIndex].Id} style={{ textDecoration: 'none' }} aria-label="EdiÃ§Ã£o">
                  <Tooltip title={"Download"}>
                    <IconButton>
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
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
                <Link to={'/EditFields/' + this.state.data[tableMeta.rowIndex].Id} style={{ textDecoration: 'none' }} aria-label="EdiÃ§Ã£o">
                  <Tooltip title={"Download"}>
                    <IconButton>
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
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
        <Page pagetitle="Listar Operações" history={this.props.history}>

            <Row>
              
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  id="documento"
                  label="CPF/CNPJ"
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                  />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  id="operacao"
                  label="Operação"
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  variant="outlined"
                  fullWidth
                    />
              </Grid>
            </Row>

            <Row>
            <Grid item xs={12} md={12}>
              <Buttons variant='outlined' color='secondary' onClick={this.handleGet}>
                <SearchIcon />
                  Pesquisar
                </Buttons>
                </Grid>
            </Row>          

              

          <Snack variant={this.state.variant} message={this.state.message} open={this.state.openSnack} onClose={this.handleClose}></Snack>
          <MUIDataTable
            title={""}
            data={this.state.data}
            columns={columns}
            options={options}
          />
        </Page>
      </Container>
    );
  }
}

