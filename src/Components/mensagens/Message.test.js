
import React from "react";
import Message from './message'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente Message', () =>{

    it('Teste renderização componente Message', () => {
        const wrapper = shallow(<Message />)

        console.log(wrapper.debug())
    })


})

