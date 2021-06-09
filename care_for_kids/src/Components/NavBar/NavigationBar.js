import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
// import Controls from '../controls/Controls';
import Link from '@material-ui/core/Link';
import ServiceLayer from '../../Service/serviceLayer';
import jwtDecode from 'jwt-decode';
import Logo from '../../Assets/logo.png'




const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  links: {
    display: 'inline',
    margin: '0 5rem 0 5rem',
    fontFamily: 'Roboto', 
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  image: {
    padding: '0',
    margin: '0',
    height: '90px',
    width: '350px'
  },
  navbar: {
    background: '#5EBA7D'
  },
  role: {
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(6),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navLink: {
    color: 'white',
    listStyle: 'none',
    position: 'relative',
    textDecoration: 'none',
  },
}));

export default function NavigationBar() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [user, setUser] = useState();
  const [mailCount, setMailCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const [initialLogin, setInitialLogin] = useState(true)

  const jwt = localStorage.getItem('token')

  useEffect(() => {
    if(jwt){
      setInitialLogin(false);
      let userInfo = jwtDecode(jwt);
      setUser(userInfo);
    }
  },[])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    localStorage.removeItem('token');
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.href ='/login'
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Off</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      color="primary"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {initialLogin && 
        <MenuItem onClick={handleProfileMenuOpen}>
          <p style={{marginLeft: '5px'}} >About Us</p>
        </MenuItem>
      }
      </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Link component={RouterLink} 
          to={initialLogin ? '/login' : user.is_daycare ? 'view-daycare-profile' : 'view'} 
          underline="none" 
          className={classes.navLink}>
            <Typography className={classes.title} paragraph={false} align="center" noWrap>
              <img className={classes.image} src={Logo} alt="Logo"/>
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* NEED TO ADD LINKS */}
          {initialLogin === true && <Typography className={classes.links} variant="h5" noWrap> About Us </Typography> }
          {!initialLogin && user.is_daycare ?
            <Link className={classes.links} variant="h5" href="/view-daycare-profile" noWrap> View Profile </Link>
            :
            <Link className={classes.links} variant="h5" href="/view-parent-profile" noWrap> View Profile </Link>
          }

          {/* Icons with Badges */}
            {initialLogin === false && <IconButton aria-label="show new mails" color="inherit">
              <Badge badgeContent={mailCount} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton> }
            {initialLogin === false && <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={notificationCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> }
            {initialLogin === false && <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> }
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
        </Toolbar>
      </AppBar>
      {/* CREATE DAYCARE VIEW */}
      {/* CREATE PARENT VIEW */}
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}