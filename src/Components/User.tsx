
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import MailIcon from '@material-ui/icons/MailOutline';
import MoreIcon from '@material-ui/icons/MoreVertOutlined';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },

        color: {
            color: 'darkgray',
        },
        sectionDesktop: {
            display: 'none',
            color: 'gray',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            color: 'gray',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);


interface userProps {
    container?: Element;
    children?: any;
    version?: string;
    system?: string;
    search?: any;
    user?: any;
    out?: any;
}

export default function User(props: userProps) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Minha conta</MenuItem>
        </Menu>
    );
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="primary">
                        <MailIcon className={classes.color} />
                    </Badge>
                </IconButton>
                <p>Mensagens</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="primary">
                        <NotificationsIcon className={classes.color} />
                    </Badge>
                </IconButton>
                <p>Notificações</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle className={classes.color} />
                </IconButton>
                <p>Perfil</p>
            </MenuItem>
        </Menu>
    );

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    return (
        <div>
            <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="primary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="primary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </div>

            {renderMobileMenu}
            {renderMenu}
        </div>

    );
}


