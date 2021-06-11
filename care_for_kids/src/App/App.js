import React, {useEffect, useState} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from '../Components/Authentication/Register';
import Login from '../Components/Authentication/Login'
import jwtDecode from 'jwt-decode';
import './App.css';
import { Paper } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import NavigationBar from '../Components/NavBar/NavigationBar';
import DaycareProfile from '../Components/Profiles/DaycareProfile';
import ParentProfile from '../Components/Profiles/ParentProfile';
import ViewParentProfile from '../Components/Profiles/ViewParentProfile';
import ViewDaycareProfile from '../Components/Profiles/ViewDaycareProfile';
import serviceLayer from '../Service/serviceLayer';
import DaycareSearchPage from '../Components/DaycareSearch/DaycareSearchPage';
import DaycareDetails from '../Components/DaycareDetails/DaycareDetails';


function App() {

  const [user, setUser] = useState();
  const [parent, setParent] = useState();
  const [allParents, setAllParents] = useState([])
  const [daycare, setDaycare] = useState();
  const [allDaycares, setAllDaycares] = useState([])

  const jwt = localStorage.getItem('token')
  function getToken() {
    try{
      const user = jwtDecode(jwt);
      setUser(user);
    } catch {}
  }

  useEffect(() => {
    getToken();
    if(jwt){
      getParents();
      getDaycares();
    }

  }, [])

  useEffect(() => {
    allParents.forEach(p => {
      if (user.user_id === p.user){
        setParent(p);
      }
    })

  }, [allParents])
  
  async function getParents(){
    try {
      const response = await serviceLayer.getAllParents();
      setAllParents(response.data);
    }
    catch(err){
      console.log('APP', err);
    }
  }

  async function getDaycares(){
    try{
      const response = await serviceLayer.getAllDaycares();
      setAllDaycares(response.data);
    }
    catch(err){
      console.log('APP', err);
    }
  }

  return (
    <Paper>
    <CssBaseline />
    <NavigationBar user={user} />
    <Switch>
    <Route path="/" exact={true} render = { props => {
                if (!user){
                  return <Route to="/login" component={Login} />
                }
                else if (user && user.is_daycare){
                  return <Route to='/view-daycare-profile' component={ViewDaycareProfile} />
                }
                else {
                  return <Route to='/view-parent-profile' component={ViewParentProfile} />
                }
              }}
            />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Route path='/create-daycare-profile' component={DaycareProfile} />
      <Route path='/create-parent-profile' component={ParentProfile} />
      <Route path='/view-parent-profile' component={ViewParentProfile} />
      <Route path='/view-daycare-profile' component={ViewDaycareProfile} />
      <Route path='/daycare-search'><DaycareSearchPage allParents={allParents} parent={parent} daycares={allDaycares} user={user}/> </Route>
      <Route path="/daycare-details"><DaycareDetails daycares={allDaycares} /></Route>
    </Switch>
    </Paper>
  );
}

export default App;
