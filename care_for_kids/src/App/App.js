import React, {useEffect, useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from '../Components/Authentication/Register';
import Login from '../Components/Authentication/Login'
import jwtDecode from 'jwt-decode';
import './App.css';

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
    <Switch>
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
    </Switch>
  );
}

export default App;
