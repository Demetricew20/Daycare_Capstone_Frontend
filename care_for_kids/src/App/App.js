import React, {useEffect, useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from '../Components/Authentication/Register';
import Login from '../Components/Authentication/Login'
import jwtDecode from 'jwt-decode';
import './App.css';
import { Paper } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import NavigationBar from '../Components/NavBar/NavigationBar'
import DaycareProfile from '../Components/Profiles/DaycareProfile';


function App() {

  const [user, setUser] = useState();

  function getToken() {
    const jwt = localStorage.getItem('token')
    try{
      const user = jwtDecode(jwt);
      this.setState({user: user})
    } catch {}
  }

  useEffect(() => {
    getToken();
  }, [])

  
  return (
    <Paper>
    <CssBaseline />
    <NavigationBar user={user} />
    <Switch>
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/daycareProfile' component={DaycareProfile} />
    </Switch>
    </Paper>
  );
}

export default App;
