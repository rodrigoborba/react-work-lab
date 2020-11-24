import * as React from "react";
import axios from 'axios';
import {Container, Page, Fieldset, ButtonGroup, Snack} from 'bnb-ui/dist';
import { TextField, Button } from '@material-ui/core';

export interface PropsEditFields {
  history?: any;
  match?: any;
  children: React.Component;
}

export interface StateEditFields {
  sistemas: any,
  id: any,
  descricao: string,
  hasError: boolean,
  variant: string,
  messageErro: string,
  message: string,
  objSnack: [string, string],
  keycloak?: any;
  authenticated?: any;
  retorno?: any;
  openSnack?: any;
}


export default class EditFields extends React.Component<PropsEditFields, StateEditFields>{

  constructor(props: PropsEditFields) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      sistemas: [],
      id: this.props.match.params.id,
      descricao: '',
      hasError: false,
      variant: '',
      messageErro: '',
      message: '',
      objSnack: ['', ''],
      keycloak: null,
      authenticated: false,
      retorno: '',
      openSnack: false,
    };
  }

  componentDidMount() {
    let authenricated = localStorage.getItem('authenricated');
    let keycloack = localStorage.getItem('keycloak');

    this.setState({authenticated: authenricated}); 
    this.setState({keycloak: keycloack });

    this.handleGet(keycloack);

  };

  handleGet = (keycloack: any) =>{

    let config = {
      headers: { 'Authorization': "Bearer " + keycloack }
    };
    console.log(keycloack);
    axios.get(`http://d001mfd1/s000-teste/v1/api/sistemas/${this.state.id}`, config)
      .then(res => {
        const sistemas = res.data;
        this.setState({ sistemas });
        const descricao = String(this.state.sistemas.descricao);
        this.setState({ descricao });
      })

  }

  handleChange = (event: { target: { value: string; }; }) => {
    this.setState({ descricao: event.target.value });
  };

  handleSnack = () => {
    if (this.state.hasError) {
      this.setState({ variant: 'error', message: this.state.messageErro });
    } else {
      this.setState({ variant: 'success', message: 'Sistema editado com sucesso!' })
    }
    this.setState({ objSnack: [this.state.variant, this.state.message] });
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const descricao = {
      descricao: this.state.descricao
    };
    let config = {
      headers: { 'Authorization': "Bearer " + this.state.keycloak }
    };
    console.log(config+ 'teste');
    axios.put(`http://d001mfd1/s000-teste/v1/api/sistemas/${this.state.id}`, descricao, config)
      .then(res => {
        this.handleSnack();
        this.props.history.push({
          pathname: '/Crud',
          state: this.state.objSnack,
        })
      })
      .catch(error => {
        this.setState({ hasError: true, messageErro: error });
        if(error.response.status === 403){
          this.setState({openSnack: true});
        }
      });
  };

  handleCloseSnack = (reason: any) => {
    if (reason === 'clickaway') {
      return this.setState({openSnack: false});
    }

    return this.setState({openSnack: false});
  };

  render() {

    return (
      <Container>
        <Page pagetitle="Editar" history={this.props.history}>
          <form onSubmit={this.handleSubmit}>
            <Fieldset subtitle="Sistema">

              <TextField
                label="Descrição"
                onChange={this.handleChange}
                value={this.state.descricao}
                fullWidth
                variant="outlined"
              />


            </Fieldset>
            <ButtonGroup>
              <Button variant="contained" color="secondary" type="submit">
                Salvar
                </Button>
            </ButtonGroup>
            <Snack variant="error" message="O usuário não tem permissão para executar essa tarefa." open={this.state.openSnack} onClose={this.handleCloseSnack}></Snack>

          </form>
        </Page>
      </Container>
    );
  }
}



