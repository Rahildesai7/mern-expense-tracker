import './App.css';
import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import Main from '../src/components/Main/Main';
import Login from '../src/components/Login/Login';
import Register from '../src/components/Register/Register';

function App() {

  const [auth, setAuth] = useState(false);

  const LoggedIn = () =>{
    setAuth(true);
  }

  return (
    <div className="App">
      <Router>
        <Route path='/main'>
          {auth ? (<Main/>) : (
          <Redirect to={{
            pathname: '/users/login',
            state: { LoggedIn: {LoggedIn} }
      }}/>
    )}
        </Route>
        <Route path='/users/login'>
          <Login LoggedIn={LoggedIn}/>
        </Route>
        <Route path='/users/add'><Register /></Route>
      </Router>
    </div>
  );
}

export default App;
