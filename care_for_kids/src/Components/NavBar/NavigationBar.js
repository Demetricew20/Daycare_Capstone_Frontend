import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import ListIcon from '@material-ui/icons/List';
import CategoryIcon from '@material-ui/icons/Category';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// import Controls from '../controls/Controls';
import Link from '@material-ui/core/Link';
import ServiceLayer from '../../Service/serviceLayer';
import jwtDecode from 'jwt-decode';




const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
  navlink: {
    color: 'white',
    listStyle: 'none',
    position: 'relative',
  }
}));

export default function NavigationBar() {

  const jwt = localStorage.getItem('token');

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [mailCount, setMailCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const [sellerTitleDisabled, setSellerTitleDisabled] = useState(true);
  const [buyerTitleDisabled, setBuyerTitleDisabled] = useState(true);
  const [initialLogin, setInitialLogin] = useState(true)

  useEffect(() => {
    if (jwt) {
      const user = jwtDecode(jwt);
      getCartItems();
      getMailItems();
      getNotificationItems();
      setInitialLogin(false)
      if (user.isSupplier === "True") {
        setSellerTitleDisabled(false);
      } else {
        setBuyerTitleDisabled(false);
      }
    } else {
      setInitialLogin(true)
    }
  },[jwt])


  async function getCartItems(e){
    try{
        const response = await ServiceLayer.getItemCount();
        setCartCount(response.data[0].count);
    }
    catch(e){
        console.log('GetCartItems API call unsuccessful', e)
    }
  }

  async function getMailItems() {
    try{
      // ** Add code once Mail endpoints have been created
      //const response = await ServiceLayer.getMailCount();
      //setMailCount(response.data[0].count)
      setMailCount(0)
    } 
    catch(e){
      console.log('GetMailCount API call unsuccessful', e)
    }
  }

  async function getNotificationItems() {
    try{
      // ** Add code once Notification endpoints have been created
      //const response = await ServiceLayer.getNotificationCount();
      //setMailCount(response.data[0].count)
      setNotificationCount(0)
    } 
    catch(e){
      console.log('GetMailCount API call unsuccessful', e)
    }
  }
    
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show new mails" color="inherit">
          <Badge badgeContent={mailCount} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={notificationCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );


  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Link component={RouterLink} to={''} className={classes.navlink}>
            <Typography className={classes.title} variant="h6" noWrap>
              Care 4 Kids
            </Typography>
          </Link>
          {/* <div className={classes.role}>
          {buyerTitleDisabled === false && <Typography className={classes.title} variant="h6" noWrap> Buyer </Typography> }
          {sellerTitleDisabled === false && <Typography className={classes.title} variant="h6" noWrap> Seller </Typography> }  
          </div> */}
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>



          {/* BUYER: Conditional Links */}
          {/* {initialLogin === false && <Link component={RouterLink} to={'productList'}  >
              <Controls.Button 
                aria-label="product list" 
                color="primary.light" 
                text="Products"
                startIcon={<ListIcon />}
              >Products</Controls.Button>
            </Link> } */}
            {/* {buyerTitleDisabled === false && <Link component={RouterLink} to={'OrderList'}  >
              <Controls.Button 
                aria-label="order history" 
                color="primary.light" 
                text="Orders" 
                startIcon={<HistoryIcon 
              />}>Orders</Controls.Button>
            </Link> } */}
                    
                    
          {/* SELLER: Conditional Links */}
          {/* {sellerTitleDisabled === false &&<Link component={RouterLink} to={'categoryList'}  >
              <Controls.Button 
                aria-label="category list" 
                color="default" 
                text="Categories" 
                startIcon={<CategoryIcon 
              />}>Orders</Controls.Button>
            </Link> } */}

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
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}