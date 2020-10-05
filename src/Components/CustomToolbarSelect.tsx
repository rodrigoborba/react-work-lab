import * as React from "react";
import { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {Snack} from 'bnb-ui/dist'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      marginRight: "24px",
      top: "50%",
      display: "inline-block",
      position: "relative",
    },
  }),
);

export interface PropsCustomToolbarSelect {
  history?: any;
  classes?: any;
  fullScreen?: any;
  selectedRows: any;
  data: any;
  handleGet: any;
}

export default function Custom(props: PropsCustomToolbarSelect) {

  const classes = useStyles();

  const [openSnack, setOpenSnack] = useState(false);
  const [open, setOpen] = useState(false);
  const [hasError, setHasEError] = useState(false);
  const [message, setMessage] = useState('');
  const [objSnack, setObjSnack] = React.useState({
    variant: '',
    messageSnack:'',
  });
  const [selection, setSelection] = useState([]);
  const keycloack = localStorage.getItem('keycloak');
  const [keycloak, setKeycloak] = useState(keycloack);

  function handleClickDelete() {
    const selection = props.selectedRows.data.map((row: { dataIndex: any; }) => row.dataIndex);
    setSelection(selection);
    const exclude: any[] = [];
    for (var j = 0; j < selection.length; j++) {
      exclude[j] = props.data[selection[j]];
    }
    let config = {
      headers: { 'Authorization': "Bearer " + keycloak }
    };
    for (var i = 0; i < exclude.length; i++) {
      axios.delete(`http://d001mfd1/s000-teste/v1/api/sistemas/${exclude[i].Id}`, config)
        .then(res => {
          // setOpenSnack(true);
          // handleSnack();
          props.handleGet();   
        })
        .catch(error => {
          if(error.response.status === 403){
            setOpenSnack(true);
          }
        });
    }
  }

  
  function handleSnack() {
    if (hasError) {
      setObjSnack({variant:'error', messageSnack: message})
      // this.setState({ variant: 'error', message: this.state.messageErro });
    } else {
      setObjSnack({variant:'success', messageSnack: 'Sistema editado com sucesso!' })
      // this.setState({ variant: 'success', message: 'Sistema editado com sucesso!' })
    }
    return objSnack;
    // this.setState({ objSnack: [this.state.variant, this.state.message] });
  };


  function handleCloseSnack (reason: any) {
    if (reason === 'clickaway') {
      return setOpenSnack(false);
    }

    return setOpenSnack(false);
  };

  return (
    <div className={"custom-toolbar-select"}>
      <Tooltip title={"Deletar"}>
        <IconButton className={classes.iconButton} onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={props.fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Remover linha(s)?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja remover essas linha(s)?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button color="secondary" onClick={handleClickDelete} autoFocus>
            Remover
          </Button>
          <Snack variant="error" message="O usuário não tem permissão para executar essa tarefa." open={openSnack} onClose={handleCloseSnack}></Snack>

        </DialogActions>
      </Dialog>
    </div>
  );

}