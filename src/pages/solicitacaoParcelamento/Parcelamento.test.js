
import React from "react";
import Parcelamento from './Parcelamento'
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Testes historia incluir Parcelamento', () =>{

    it('Teste renderização componente', () => {
        const wrapper = shallow(<Parcelamento />)

        console.log(wrapper.debug())
    })


})

