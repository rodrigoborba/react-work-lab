import * as React from "react";
import List from '@material-ui/core/List';
import {MenuItem, MenuItemCollapse, CollapseItem} from 'bnb-ui/dist';
import HomeOutlined from '@material-ui/icons/HomeOutlined'

const MenuList = () =>
    <List component="nav">
        {/* Quando não houver collapse no item de menu, usa-se o componente MenuItem */}
        <MenuItem to='/' primary="Home"><HomeOutlined /></MenuItem>
        {/* <MenuItem to='/teste' primary="teste"><HomeOutlined /></MenuItem> */}
        {/* Quando houver collapse, usa-se o componente MenuItemCollpase para o item pai */}
        <MenuItemCollapse primary="Exemplos" >
            {/* // Usa-se o componente CollapseItem para os filhos */}
            <CollapseItem to='/Formulario' primary="Formulário"></CollapseItem>
            <CollapseItem to='/Steppers' primary="Steppers"></CollapseItem>
            <CollapseItem to='/Tab' primary="Tab"></CollapseItem>
            <CollapseItem to='/Crud' primary="Exemplo CRUD"></CollapseItem>
        </MenuItemCollapse>

    </List>
    ;

export default MenuList;