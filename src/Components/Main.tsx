import React, {Suspense, lazy } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { Load } from "bnb-ui/dist";

import Home from './Home';
import ListarOperacoes from '../pages/listar-operacoes/ListarOperacoes';

const renderLoader = () => {
    return <Load></Load>
};

const Parcelamento = lazy(() => import('../pages/solicitacaoParcelamento/Parcelamento'));

const Main = () => (
    <Suspense fallback={renderLoader()}>

<Switch >
        <Route>
            {/* path='/' indica o caminho da home */}
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/Teste' component={teste} /> */}

            <Route path='/ListarOperacoes' component={ListarOperacoes} /> 

            <Route path='/solicitacaoParcelamento/Parcelamento/:operacaoCliente' component={Parcelamento} /> 

            {/* <Route path="*" component={Page404} /> */}
            {/* indica todas as pÃ¡ginas que nÃ£o foram encontradas */}
            {/* <Route component={Page404} /> */}
        </Route>
    </Switch>

    </Suspense>
   
);

export default withRouter(Main);