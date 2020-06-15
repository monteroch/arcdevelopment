import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
    const { children } = props;
    
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em',
        [theme.breakpoints.down("md")]: {
            marginBottom: '2em'
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: '1.25em'
        }
    },
    logo: {
        height: '8em',
        [theme.breakpoints.down("md")]: {
            height: '7em'
        },
        [theme.breakpoints.down("xs")]: {
            height: '5.5em'
        }
    },
    tabContainer: {
        marginLeft: 'auto'
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: '25px'
    },
    button: {
        borderRadius: '50px',
        marginLeft: "50px",
        marginRight: "25px",
        height: '45px',
        ...theme.typography.estimate,
        "&:hover": {
            backgroundColor: theme.palette.secondary.light
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    menu: {
        backgroundColor: theme.palette.common.arcBlue,
        color: 'white',
        borderRadius: '0px'
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIconContainer: {
        marginLeft: 'auto', 
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    drawerIcon: {
        height: '50px',
        width: '50px'
    },
    drawer: {
        backgroundColor: theme.palette.common.arcBlue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7

    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.arcOrange
    },
    drawerItemSelected: {
        "& .MuiListItemText-root": {
            opacity: 1
        }
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1
    },
}))

export default function Header({value, setValue, selectedIndex, setSelectedIndex}){
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setanchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    

    const handlechange = (e, newValue) => {
        setValue(newValue)
    }

    const handleClick = (e) => {
        setanchorEl(e.currentTarget);
        setOpenMenu(true);
    }

    const handleMenuItemClick = (event, index) => {
        setanchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(index);
    };

    const handleClose = (e) => {
        setanchorEl(null);
        setOpenMenu(false);
    }

    const menuOptions = [
        {name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0},
        {name: 'Custome Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1},
        {name: 'iOS/Android App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2},
        {name: 'Websites Development', link: '/websites', activeIndex: 1, selectedIndex: 3},
    ];

    const routes = [
        {name: "Home", link: "/", activeIndex: 0},
        {name: "Services", link: "/services", activeIndex: 1, ariaOwns: anchorEl ? "services-menu" : undefined, ariaPopup: anchorEl ? 'true' : undefined, mouseOver: (event) => handleClick(event)},
        {name: "Revolution", link: "/revolution", activeIndex: 2},
        {name: "About us", link: "/aboutus", activeIndex: 3},
        {name: "Contact us", link: "/contact", activeIndex: 4}
    ]

    useEffect(() => {
        [...menuOptions, ...routes].forEach(route => {
            switch(window.location.pathname){
                case `${route.link}`:
                    if(value !== route.activeIndex){
                        setValue(route.activeIndex)
                        if(route.selectedIndex && route.selectedIndex !== selectedIndex){
                            setSelectedIndex(route.selectedIndex)
                        }
                    }
                    break;
                case '/estimate':
                    setValue(5);
                    break;
                default:
                    break;
            }
        })
    }, [value, menuOptions, selectedIndex, routes])

    const tabs = (
        <React.Fragment>
            <Tabs value={value} className={classes.tabContainer} onChange={handlechange} indicatorColor="primary">
                {
                    routes.map((route, index) => (
                        <Tab
                            key={index}
                            className={classes.tab}
                            component={Link}
                            to={route.link}
                            label={route.name}
                            aria-owns={route.ariaOwns}
                            arias-haspopup={route.ariaPopup}
                            onMouseOver={route.mouseOver}
                        />
                    ))
                }
            </Tabs>
            <Button component={Link} to="/estimate" onClick={() => setValue(5)} variant="contained" color="secondary" className={classes.button}>
                Free Estimate
            </Button>
            <Menu 
                id="services-menu" 
                anchorEl={anchorEl} 
                open={openMenu} 
                onClose={handleClose}
                MenuListProps={{onMouseLeave: handleClose}}
                classes={{paper: classes.menu}}
                elevation={0}
                keepMounted
                style={{zIndex: 1302}}
            >
                {
                    menuOptions.map((option, index) => (
                        <MenuItem
                            key={index}
                            component={Link}
                            to={`${option.link}`}
                            classes={{root: classes.menuItem}}
                            onClick={(event, index) => {
                                handleMenuItemClick(event, index);
                                setValue(1);
                                handleClose();
                            }}
                            selected={index === selectedIndex && value === 1}
                        >
                            {option.name}
                        </MenuItem>
                    ))
                }
            </Menu>
        </React.Fragment>
    );

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer 
                disableBackdropTransition={!iOS} 
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{paper: classes.drawer}}
            >
                <div className={classes.toolbarMargin}></div>
                <List disablePadding>
                    {
                        routes.map((route, index) => (
                            <ListItem key={index} classes={{selected: classes.drawerItemSelected}} divider button component={Link} onClick={() => {setOpenDrawer(false); setValue(route.activeIndex)}} to={route.link} selected={value === route.activeIndex}>
                                <ListItemText className={classes.drawerItem} disableTypography>{route.name}</ListItemText>
                            </ListItem>
                        ))
                    }
                    <ListItem classes={{root: classes.drawerItemEstimate, selected: classes.drawerItemSelected}} divider button component={Link} onClick={() => {setOpenDrawer(false); setValue(5)}} to='/estimate' selected={value === 5}>
                        <ListItemText className={classes.drawerItem} disableTypography>Estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
            <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
                className={classes.drawerIconContainer}
            >
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment> 
    );

    return(
        <React.Fragment>
            <ElevationScroll>
                <AppBar
                    position='fixed'
                    className={classes.appbar}
                >
                    <Toolbar disableGutters>
                        <Button className={classes.logoContainer} component={Link} to='/' onClick={() => setValue(0)} disableRipple>
                            <img alt='company_logo' className={classes.logo}  src={logo}/>
                        </Button>
                        {
                            matches ? drawer : tabs
                        }
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>
    )
}