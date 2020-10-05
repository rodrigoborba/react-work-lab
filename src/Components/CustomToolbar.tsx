import * as React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { Fab} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      iconButton: {
        boxShadow: 'none',
        marginLeft: '10px',
      },
    }),
);

export interface PropsCustomToolbar {
  history?: any;
  classes?: any;
}

export default function CustomToolbar(props: PropsCustomToolbar){
  const classes = useStyles();

  return (
    <Link to="/AddSistema">
        <Tooltip title={"Adicionar Sistema"}>
                <Fab color="primary" className={classes.iconButton}  size='small'>
                     <AddIcon />
                </Fab>
        </Tooltip>
    </Link>
);
}