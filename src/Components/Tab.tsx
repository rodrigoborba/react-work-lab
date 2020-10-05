import * as React from "react";
import {Container, Page} from 'bnb-ui/dist';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';

export interface PropsTabContainer  { 
  children: React.ReactNode
}

function TabContainer(props: PropsTabContainer) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export interface PropsTab {
  history: any;
}

export interface StateTab {
  value: number;
}

export class TabExemplo extends React.Component<PropsTab, StateTab>{

  constructor(props: PropsTab) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event: any, value: any) => {
    this.setState({ value });
  }

  render() {

    const { value } = this.state;
    return (
      <Container>
        <Page pagetitle="Tab" history={this.props.history}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Exemplo 1" />
              <Tab label="Exemplo 2" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão. O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electrónica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letraset, que continham passagens com Lorem Ipsum, e mais recentemente com os programas de publicação como o Aldus PageMaker que incluem versões do Lorem Ipsum.</TabContainer>}
          {value === 1 && <TabContainer>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</TabContainer>}

        </Page>
      </Container >
    )
  }

}
export default (TabExemplo);
