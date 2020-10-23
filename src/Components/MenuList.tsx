import * as React from "react";
import List from '@material-ui/core/List';
import { MenuItem } from 'bnb-ui/dist';
import HomeOutlined from '@material-ui/icons/HomeOutlined'

const MenuList = () =>
    <List component="nav">
        {/* Quando não houver collapse no item de menu, usa-se o componente MenuItem */}
        <MenuItem to='/ListarOperacoes' primary="Listar Operações"><HomeOutlined /></MenuItem>
        {/* <MenuItem to='/teste' primary="teste"><HomeOutlined /></MenuItem> */}
        {/* Quando houver collapse, usa-se o componente MenuItemCollpase para o item pai */}
        {/*<MenuItemCollapse primary="Menu" >                                           */}
            {/* // Usa-se o componente CollapseItem para os filhos */}
            {/* <CollapseItem to='/ListarOperacoes' primary="Listar Operações"></CollapseItem> */}
        {/* </MenuItemCollapse> */}

    </List>
    ;

export default MenuList;