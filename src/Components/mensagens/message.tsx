import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core'

import Buttons from 'bnb-ui/dist/Buttons'

interface MensagemDialogoProps {
  mensagem: string;
  tipoErro?: boolean;
  tituloMensagemErro?: string;
  exibir: boolean;
  setExibir: Function;

}

function MensagemDialogo (props: MensagemDialogoProps) {
  function fecharDialogo () {
    props.setExibir(false)
  }

  if (props.exibir) {
    return (
      <Dialog open={props.exibir} onClose={fecharDialogo}>
        {props.tituloMensagemErro
          ? <DialogTitle>{props.tituloMensagemErro}</DialogTitle>
          : <DialogTitle>{props.tipoErro ? 'Erro' : 'Sucesso!'}</DialogTitle>}
        <DialogContent>
          <DialogContentText>{props.mensagem}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Buttons
            variant='outlined'
            onClick={fecharDialogo}
            autoFocus>
            OK
          </Buttons>
        </DialogActions>
      </Dialog>)
  }
  return (<div></div>)
}

export default MensagemDialogo
