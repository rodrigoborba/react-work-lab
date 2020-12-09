import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down('sm')]: {
              display : 'none',
              },
          },
          grow: {
            flexGrow: 1,
          },
          search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(1),
              width: 'auto',
            },
          },
          searchIcon: {
            width: theme.spacing(9),
            color: theme.palette.text.secondary,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          inputRoot: {
            color: 'inherit',
            width: '100%',
          },
          inputInput: {
            color: theme.palette.text.secondary,
            paddingTop: theme.spacing(2),
            paddingRight: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            paddingLeft: theme.spacing(10),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              width: 100,
              '&:focus': {
                width: 100,
              },
            },
            [theme.breakpoints.up('md')]: {
                width: 100,
                '&:focus': {
                  width: 200,
                },
              },
          },
    }),
);


interface SearchProps {
    container?: Element;
    children?: any;
    version?: string;
    system?: string;
    search?: any;
    user?: any;
    out?: any;
}


export default function Search(props: SearchProps) {
    const classes = useStyles();

  return (
    <div className={classes.root}>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Procurar…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
    </div>
  );
}
