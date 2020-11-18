import React from 'react';
import ReactDOM from 'react-dom';
import { App, Header } from 'bnb-ui/dist';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import MenuList from './Components/MenuList';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from './Components/Main';
import Out from './Components/Out';

const history = createBrowserHistory();

ReactDOM.render(

        <Router history={history}>
            <MuiThemeProvider theme={App}>
                <Header version="0.2.fake! Ajuste!" system="549 - Parcelamento de Cobrança Extra Judicial" out={<Out />}>
                    <MenuList></MenuList>
                </Header>
                <Main></Main>
            </MuiThemeProvider>
        </Router>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
