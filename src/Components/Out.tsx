
import React, { useState } from 'react';
import { Buttons } from 'bnb-ui/dist';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export interface PropsOut {
    history?: any;
    classes?: any;
    fullScreen?: any;
}

function handleOut(){
    localStorage.setItem('authenricated', "");
    localStorage.setItem('keycloak', "");
    window.location.href= process.env.REACT_APP_LOGOUT_URL + '' + process.env.REACT_APP_NGINX_ENDPOINT;
} 

export default function Out(props: PropsOut) {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Buttons onClick={()=> setOpen(true)}>Sair</Buttons>
            <Dialog
                fullScreen={props.fullScreen}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Sair da aplicação?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja sair da aplicação?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => setOpen(false)}>
                        Cancelar
          </Button>
                    <Button color="secondary" onClick={() => handleOut()} autoFocus>
                        Sair
          </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}


