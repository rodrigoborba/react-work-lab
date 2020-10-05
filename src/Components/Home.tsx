import * as React from "react";
import { Watermark, Container } from 'bnb-ui/dist';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    perfis: {
      position: "absolute",
    },
  }),
);

function Home() {
  const classes = useStyles();

  return (
    <Container>
        <div className={classes.perfis}>
          <p>Para testar o uso de permissões na tela CRUD:</p>
          <ul>
            <li>Usuário básico: F900072</li>
            <li>Senha: Zp5%Ve9%Pl</li>
          </ul>
          <ul>
            <li>Usuário Admin: F900073</li>
            <li>Senha: Ix2%Qk9&Jg</li>
          </ul>
        </div>
        <Watermark></Watermark>
    </Container>
  );
}

export default (Home);