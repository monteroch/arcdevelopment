import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

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
        marginBottom: '3em'
    },
    logo: {
        height: '8em'
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
        ...theme.typography.estimate
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
}))

export default function Header(){
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handlechange = (e, value) => {
        setValue(value)
    }

    useEffect(() => {
        if(window.location.pathname === "/" && value !== 0)
            setValue(0)
        else if (window.location.pathname === "/services" && value !== 1)
            setValue(1);
        else if (window.location.pathname === "/revolution" && value !== 2)
            setValue(2);
        else if (window.location.pathname === "/aboutus" && value !== 3)
            setValue(3);
        else if (window.location.pathname === "/contact" && value !== 4)
            setValue(4);
        else if (window.location.pathname === "/estimate" && value !== 5)
            setValue(5);
    })

    return(
        <React.Fragment>
            <ElevationScroll>
                <AppBar>
                    <Toolbar disableGutters>
                        <Button className={classes.logoContainer} component={Link} to='/' onClick={() => setValue(0)} disableRipple>
                            <img alt='company_logo' className={classes.logo}  src={logo}/>
                        </Button>
                        <Tabs value={value} className={classes.tabContainer} onChange={handlechange} indicatorColor="primary">
                            <Tab className={classes.tab} label="Home" component={Link} to="/"/>
                            <Tab className={classes.tab} label="Services" component={Link} to="/services"/>
                            <Tab className={classes.tab} label="The revolution" component={Link} to="/revolution"/>
                            <Tab className={classes.tab} label="About us" component={Link} to="/aboutus"/>
                            <Tab className={classes.tab} label="Contact us" component={Link} to="/contact"/>
                        </Tabs>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Free Estimate
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>
    )
}