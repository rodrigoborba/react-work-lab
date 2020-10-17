import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { createBrowserHistory, History } from "history";

import Home from './Home';
import ListarOperacoes from '../pages/listar-operacoes/ListarOperacoes';

const Main = () => (
    <Switch >
        <Route>
            {/* path='/' indica o caminho da home */}
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/Teste' component={teste} /> */}

            <Route path='/ListarOperacoes' component={ListarOperacoes} /> 

            {/* <Route path="*" component={Page404} /> */}
            {/* indica todas as pÃ¡ginas que nÃ£o foram encontradas */}
            {/* <Route component={Page404} /> */}
        </Route>
    </Switch>
);

export default withRouter(Main);