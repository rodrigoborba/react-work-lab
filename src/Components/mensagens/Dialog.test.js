
import React from "react";
import Dialog from './dialog'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente Dialog', () =>{

    it('Teste renderização componente Dialog', () => {
        const wrapper = shallow(<Dialog />)

        console.log(wrapper.debug())
    })


})

