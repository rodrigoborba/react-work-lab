
import React from "react";
import Out from './Out'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente Out', () =>{

    it('Teste renderização componente Out', () => {
        const wrapper = shallow(<Out />)

        console.log(wrapper.debug())
    })


})

