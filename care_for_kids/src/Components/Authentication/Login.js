import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ServiceLayer from '../../Service/serviceLayer'
import jwtDecode from 'jwt-decode';
import SideImage from '../../Assets/kids_reading.jpg';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '90vh',
    },
    image: {
      backgroundImage: `url(${SideImage})`,
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#B200FF',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#60B0F4',
      fontWeight: 'bold',
    },
  }));
  
  export default function Login() {
    const classes = useStyles();
  
    const [userLogin, setUserLogin] = useState({
      username: '',
      password: '',
    });
    const [user, setUser] = useState();
    const [parentData, setParentData] = useState([]);
    const [daycareData, setDaycareData] = useState([]);

    useEffect(() => {
      getParents();
      getDaycares();
    }, [])

    async function getParents(){
      try{
        const response = await ServiceLayer.getAllParents();
        setParentData(response.data);
      }
      catch(err){
        console.log('Cannot retrieve parent data', err)
      }
    }

    async function getDaycares(){
      try{
        const response = await ServiceLayer.getAllDaycares();
        setDaycareData(response.data);
      }
      catch(err){
        console.log('Cannot retrieve daycare data', err)
      }
    }
  
    async function handleSubmit(event){
      event.preventDefault();
      const data = {
        username: userLogin.username,
        password: userLogin.password
      }

      let userData;

      try{
        const response = await ServiceLayer.loginUser(data);

          let token = response.data.access;
          window.localStorage.setItem('token', token)
          setUserLogin({
            username: data.username,
            password: data.password,
          });
          const jwt = localStorage.getItem('token');
          const userInfo = jwtDecode(jwt);
          userData = userInfo;
          setUser(userInfo);

          let activeParent;
          let activeDaycare;

          parentData.forEach(p => {
            if (p.user === userInfo.user_id && !userInfo.is_daycare){
              activeParent = true;
              return window.location.href ='/view-parent-profile';
            }
          })
          daycareData.forEach(d => {
            if (d.user === userInfo.user_id && userInfo.is_daycare){
              activeDaycare = true;
              return window.location.href = '/view-daycare-profile';
            }
          })

          if(!activeDaycare && userInfo.is_daycare){
            return window.location.href = '/create-daycare-profile';
          }
          else if (!activeParent && !userInfo.is_daycare){
            return window.location.href = '/create-parent-profile';
          }

      } catch(ex){
        console.log('** Ensure your server is running!! **')
        console.log('Error in API call', ex);
        alert("Incorrect Username or Password. Try again.")
      }
    }
  
    const onChangeUsername = (e) => {
      setUserLogin({
        ...userLogin, username: e.target.value
      })
    }
  
    const onChangePassword = (e) => {
      setUserLogin({
        ...userLogin, password: e.target.value
      })
    }
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={userLogin.username}
                onChange={onChangeUsername}
                autoComplete="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userLogin.password}
                onChange={onChangePassword}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" style={{color: '#5EBA7D', fontWeight: 'bolder'}} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} style={{color: '#5EBA7D', fontWeight: 'bolder'}} to={'register'} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Box mt={5}>
                <Copyright />
              </Box> */}
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
