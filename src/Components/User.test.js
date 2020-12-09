
import React from "react";
import User from './User'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente User', () =>{

    it('Teste renderização componente User', () => {
        const wrapper = shallow(<User />)

        console.log(wrapper.debug())
    })


})

