import * as React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { createBrowserHistory, History } from "history";

import Home from './Home';
// import teste from './teste';
import Formulario from './Formulario';
import Steppers from './Steppers';
import Tab from './Tab';
import Crud from './Crud';
import AddSistema from './AddSistema';
import EditFields from './EditFields';
// import Page404 from './Page404';


const Main = () => (
    <Switch >
        <Route>
            {/* path='/' indica o caminho da home */}
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/Teste' component={teste} /> */}
            <Route path='/Formulario' component={Formulario} />
            <Route path='/Steppers' component={Steppers} />
            <Route path='/Tab' component={Tab} />
            <Route path='/Crud' component={Crud} /> 
            <Route path='/AddSistema' component={AddSistema} />
            <Route path='/EditFields/:id' component={EditFields} /> 
            {/* indica todas as páginas que não foram encontradas */}
            {/* <Route component={Page404} /> */}
        </Route>
    </Switch>
);

export default withRouter(Main);