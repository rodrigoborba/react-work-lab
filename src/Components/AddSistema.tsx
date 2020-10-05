import * as React from "react";
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { ButtonGroup, Container, Snack, Page, Fieldset, Buttons } from 'bnb-ui/dist';
import axios from 'axios';

export interface PropsAddSistema {
  history?: any;
}

export interface StateAddSistema {
  descricao: string;
  open: boolean;
  flag: boolean;
  hasError: boolean;
  variant: string;
  messageErro: string;
  message: string;
  objSnack: [string, string];
  keycloak?: any;
  authenticated?: any;
  retorno?: any;
  openSnack?: any;
}

export default class AddSistema extends React.Component<PropsAddSistema, StateAddSistema> {

  constructor(props: PropsAddSistema) {
    super(props);
    this.handleSnack = this.handleSnack.bind(this);
    this.state = {
      descricao: '',
      open: false,
      flag: false,
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

    this.setState({ authenticated: authenricated });
    this.setState({ keycloak: keycloack });
  }

  handleChange = (event: any) => {
    this.setState({ descricao: event.target.value });
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleSnack = () => {
    if (this.state.hasError) {
      this.setState({ variant: 'error', message: this.state.messageErro });
    } else {
      this.setState({ variant: 'success', message: 'Sistema adicionado com sucesso!' })
    }
    this.setState({ objSnack: [this.state.variant, this.state.message] });
  };

  handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
    this.setState({ flag: true });

  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    const descricao = {
      descricao: this.state.descricao
    };

    let config = {
      headers: { 'Authorization': "Bearer " + this.state.keycloak }
    };
    axios.post(`http://d001mfd1/s000-teste/v1/api/sistemas/`, descricao, config)
      .then(res => {
        this.handleSnack();
        this.props.history.push({
          pathname: '/Crud',
          state: this.state.objSnack,
        })
      })
      .catch(error => {
        this.setState({ hasError: true, messageErro: error });
        if (error.response.status === 403) {
          this.setState({ openSnack: true });
        }
      });

  }

  handleCloseSnack = (reason: any) => {
    if (reason === 'clickaway') {
      return this.setState({ openSnack: false });
    }

    return this.setState({ openSnack: false });
  };

  render() {

    return (
      <div>
        <Container>
          <Page pagetitle="Adicionar Sistema" history={this.props.history}>
            <form onSubmit={this.handleSubmit}>
              <Fieldset subtitle="NOVO Sistema">
                <TextField
                  id="descricao"
                  label="Descrição"
                  onChange={this.handleChange}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </Fieldset>

              <ButtonGroup>
                <Buttons variant="contained" color="secondary" type="submit" onClick={this.handleClick}>
                  Salvar
                </Buttons>
              </ButtonGroup>
              <Snack variant="error" message="O usuário não tem permissão para executar essa tarefa." open={this.state.openSnack} onClose={this.handleCloseSnack}></Snack>

            </form>
          </Page>
        </Container>
      </div>
    );
  }
}