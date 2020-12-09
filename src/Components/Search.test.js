
import React from "react";
import Search from './Search'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente Search', () =>{

    it('Teste renderização componente Search', () => {
        const wrapper = shallow(<Search />)

        console.log(wrapper.debug())
    })


})

