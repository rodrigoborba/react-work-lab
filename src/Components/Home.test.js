
import React from "react";
import Home from './Home'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente Home', () =>{

    it('Teste renderização componente', () => {
        const wrapper = shallow(<Home />)

        console.log(wrapper.debug())
    })


})

