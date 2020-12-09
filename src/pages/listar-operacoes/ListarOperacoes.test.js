
import React from "react";

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import ListarOperacoes from "./ListarOperacoes";

Enzyme.configure({ adapter: new Adapter() })

describe('Testes historia Listar Operações', () =>{

    it('Testando renderizacao do componente', () => {
        const wrapper = shallow(<ListarOperacoes />)

        console.log(wrapper.debug())
    })

})

