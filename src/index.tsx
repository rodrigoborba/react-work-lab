import React from 'react';
import ReactDOM from 'react-dom';
import { App, Header } from 'bnb-ui/dist';
import { MuiThemeProvider } from '@material-ui/core';
import MenuList from './Components/MenuList';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from './Components/Main';
import Out from './Components/Out';

import {version} from '../package.json';

const history = createBrowserHistory();


ReactDOM.render(

        <Router history={history}>
            <MuiThemeProvider theme={App}>
                <Header version={version} system="549 - Parcelamento de Cobrança Extra Judicial" out={<Out />}>
                    <MenuList></MenuList>
                </Header>
                <Main></Main>
            </MuiThemeProvider>
        </Router>

    , document.getElementById('root'));


