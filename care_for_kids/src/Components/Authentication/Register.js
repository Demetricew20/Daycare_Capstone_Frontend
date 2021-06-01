import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ServiceLayer from '../../Service/serviceLayer';
import SideImage from '../../Assets/blocks_image.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  image: {
    backgroundImage: `url(${SideImage})`,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '100%',
    backgroundPosition: 'top',
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
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#60B0F4',
    fontWeight: 'bold',
  },
}));

export default function Register() {
  const classes = useStyles();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    is_daycare: false,
  });

  async function handleSubmit(event){
    event.preventDefault();
    const data = {
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    password: user.password,
    email: user.email,
    is_daycare: user.is_daycare,
    }
    try{
        const response = await ServiceLayer.registerUser(data);
        console.log(response);
        setUser({
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username,
        password: data.password,
        email: data.email,
        is_daycare: data.is_daycare,
        });

      if(response.data.token !== null){
        window.location.href='/login';
      }
    } catch(ex){
      console.log('Error in API call', ex.response.data);
    }
  }


  const handleChanges = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
  }

  const onChangeIsDaycare = (e) => {
    setUser({
      ...user, is_daycare: e.target.checked
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      {/* <CssBaseline /> */}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container  spacing={2} className={classes.grid}>
              <Grid item xs={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChanges}
                    autoComplete="first_name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChanges}
                    autoComplete="last_name"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={handleChanges}
                    autoComplete="userName"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={handleChanges}
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChanges}
                    autoComplete="email"
                  />
                  </Grid>
                {/* <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    id="phoneNumber"
                    value={user.phoneNumber}
                    onChange={onChangePhoneNumber}
                    autoComplete="phoneNumber"
                  />
                </Grid> */}
                {/* <Grid item xs={3}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="currencyCode"
                    label="Currency"
                    id="currencyCode"
                    value={user.currencyCode}
                    onChange={onChangeCurrencyCode}
                  />
                </Grid> */}
                <Grid item ><span>Are you registering a daycare?</span></Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    value="top"
                    control ={
                      <Checkbox
                        style={{position: 'relative', bottom: '11px', color: '#5EBA7D'}}
                        name="is_daycare"
                        id="is_daycare"
                        checked={user.is_daycare}
                        onChange={onChangeIsDaycare}
                      />
                    } 
                  />
                </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={'/login'} style={{color: '#5EBA7D', fontWeight: 'bolder'}} variant="body2">
                  {"Already have an account? Sign In"}
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
