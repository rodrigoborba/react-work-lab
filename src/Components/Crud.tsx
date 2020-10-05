import * as React from "react";
import {Container, Page, Snack, Buttons} from 'bnb-ui/dist';
import CustomToolbar from './CustomToolbar';
import CustomToolbarSelect from './CustomToolbarSelect';
import EditFields from './EditFields';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import { IconButton, Tooltip } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import { Link } from 'react-router-dom';
import Keycloak from 'keycloak-js';

export interface PropsCrud {
  history?: any;
  snackalert?: any;
  location?: any;
}

export interface StateCrud {
  sistemas: [string, string];
  data: any[];
  id: any;
  descricao: string;
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

export default class Crud extends React.Component<PropsCrud, StateCrud>{

  constructor(props: PropsCrud) {
    super(props);
    this.state = {
      sistemas: ['', ''],
      data: [],
      id: '',
      open: false,
      descricao: '',
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
    keycloak.init({ onLoad: 'login-required', flow: 'implicit' }).success(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });

      localStorage.setItem('authenricated', this.state.authenticated);
      localStorage.setItem('keycloak', this.state.keycloak.token);
      
      console.log(keycloak);
      console.log(authenticated);
      if(this.props.location.state){
        if (this.props.location.state[0] != '') {
          this.setState({ variant: this.props.location.state[0], message: this.props.location.state[1] });
          this.setState({ open: true });
        }
      }
      this.props.history.push({
        pathname: '/Crud',
        state: this.state.objSnack,
      })
      this.handleGet();

    }).error(() => {
      this.setState({variant:'error'});
      console.log(this.state.variant);
      this.setState({message:'O usuário não tem permissão para executar essa tarefa.'});
      this.setState({open: true})
    });
  };


  handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') (
      this.setState({ open: false })
    )

    this.setState({ open: false });

  };

  handleGet = () => {
    let config = {
      headers: { 'Authorization': "Bearer " + this.state.keycloak.token }
    };
    axios.get(`http://d001mfd1/s000-teste/v1/api/sistemas`, config)
      .then(res => {
        const sistemas = res.data;
        const data: any[] = [];
        sistemas.map((x: { id: any; descricao: any; }) => data.push({ 'Id': x.id, 'Descricão': x.descricao }));
        this.setState({ data });

      })
      .catch(error => {
        this.setState({ messageErro: error });
        if (error.response.status === 403) {
          this.setState({variant:'error'});
          this.setState({message:'O usuário não tem permissão para executar essa tarefa.'});
          this.setState({ openSnack: true });
        }
      });
  }

  handleClickIndex = (index: any) => (
    <EditFields>{index}</EditFields>
  );

  render() {
    const columns: any = [
      {
        name: "Descricão",
        options: {
          filter: true,
        }
      },
      {
        name: "Edicão",
        options: {
          filter: true,
          customBodyRender: (value: any, tableMeta: { rowIndex: any; }, updateValue: any) => {
            return (
              <div>
                <Link to={'/EditFields/' + this.state.data[tableMeta.rowIndex].Id} style={{ textDecoration: 'none' }} aria-label="Edição">
                  <Tooltip title={"Editar"}>
                    <IconButton>
                      <EditIcon />
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
      filterType: 'checkbox',
      responsive: 'scrollFullHeight',
      customToolbar: () => {
        return (
          <CustomToolbar />
        );
      },
      selectableRows: 'multiple',
      selectableRowsOnClick: true,
      customToolbarSelect: (selectedRows: any) =>
        (
          <CustomToolbarSelect selectedRows={selectedRows} data={this.state.data} handleGet={this.handleGet} />
        ),
      textLabels: {
        body: {
          noMatch: "Não encontrado",
          toolTip: "Sort",
        },
        pagination: {
          next: "Próxima Página",
          previous: "Página Anterior",
          rowsPerPage: "Linhas por página:",
          displayRows: "de",
        },
        toolbar: {
          search: "Procurar",
          downloadCsv: "Download",
          print: "Imprimir",
          viewColumns: "Ver Colunas",
          filterTable: "Filtrar tabela",
        },
        filter: {
          all: "Tudo",
          title: "FILTROS",
          reset: "LIMPAR",
        },
        viewColumns: {
          title: "Mostrar Colunas",
          titleAria: "Mostrar/Esconder Tabela Colunas",
        },
        selectedRows: {
          text: "linha(s) selecionadas",
          delete: "Deletar",
          deleteAria: "Deletar linhas selecionadas",
        },
      }
    };

    return (
      <Container>
        <Page pagetitle="CRUD" history={this.props.history}>
          <Snack variant={this.state.variant} message={this.state.message} open={this.state.openSnack} onClose={this.handleClose}></Snack>
          <MUIDataTable
            title={"Tabela Sistemas"}
            data={this.state.data}
            columns={columns}
            options={options}
          />
        </Page>
      </Container>
    );
  }
}


