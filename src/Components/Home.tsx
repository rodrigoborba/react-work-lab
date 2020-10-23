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
          <h1>Nota</h1>
          <p>Empresas registradas para teste até 22/10:</p>
          <ul>
            <li>Empresa: Cash do Brasil</li>
            <li>CNPJ: 73141939000140</li>
          </ul>
          <ul>
            <li>Empresa: Personal</li>
            <li>CNPJ: 12837042000160</li>
          </ul>
        </div>
        <Watermark></Watermark>
    </Container>
  );
}

export default (Home);