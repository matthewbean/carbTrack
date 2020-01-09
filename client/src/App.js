import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Stats from './pages/Stats'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/routing/PrivateRoute'
import setAuthToken from './utils/setAuthToken';

import AlertState from './context/alert/AlertState'
import FoodState from './context/food/FoodState'
import AuthState from './context/author/AuthState'

if(localStorage.token){
  setAuthToken(localStorage.token);
}


function App() {
  return (
    <AuthState>
    <FoodState>
      <AlertState>
    <div className="App">
      <Router>
      <Navbar />     
      <Switch>
        <PrivateRoute exact path = '/' component = {Home} />
        <PrivateRoute exact path = '/stats' component = {Stats} />
        <Route exact path = '/about' component = {About} />
        <Route exact path='/register' component = {Register} />
        <Route exact path = '/login' component = {Login} />
      </Switch>
      </Router>
    </div>
    </AlertState>
    </FoodState>
    </AuthState>
    
  );
}

export default App;
