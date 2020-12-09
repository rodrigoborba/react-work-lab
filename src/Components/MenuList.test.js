
import React from "react";
import MenuList from './MenuList'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes componente MenuList', () =>{

    it('Teste renderização componente MenuList', () => {
        const wrapper = shallow(<MenuList />)

        console.log(wrapper.debug())
    })


})

