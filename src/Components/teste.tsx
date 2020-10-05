import * as React from "react";
import {Container, Page} from 'bnb-ui/dist';
  
export default function Teste(props:any) {
  
    return (
        <Container>
            <Page pagetitle="Teste" history={props.history}></Page>
            {console.log(props.history)}
            {/* <Page></Page> */}
        </Container>
      
    );
  }
