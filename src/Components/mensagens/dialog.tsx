import React from 'react'

import { Dialog, DialogTitle, DialogActions } from '@material-ui/core'

import Buttons from 'bnb-ui/dist/Buttons'

interface DialogoSimNaoProps {
  mensagem: string;
  exibir: boolean;
  setExibir: Function;
  sim: Function;
  nao?: Function;
  textoSim?: string;
  textoNao?: string;
}

function DialogoSimNao (props: DialogoSimNaoProps) {
  return (
    <Dialog
      open={props.exibir}
      onClose={() => props.setExibir(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{props.mensagem}</DialogTitle>
      <DialogActions>
        <Buttons onClick={() => props.setExibir(false)} color='primary'>
          {props.textoNao || 'Não'}
        </Buttons>
        <Buttons onClick={() => props.sim()} color='primary' autoFocus>
          {props.textoSim || 'Sim'}
        </Buttons>
      </DialogActions>
    </Dialog>
  )
}

export default DialogoSimNao
