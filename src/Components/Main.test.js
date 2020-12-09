
import React from "react";
import Main from './Main'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente MainMain', () =>{

    it('Teste renderização componente Main', () => {
        const wrapper = shallow(<Main />)

        console.log(wrapper.debug())
    })


})

