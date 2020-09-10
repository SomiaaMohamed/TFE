import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from './actions/authActions';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Edit from './components/Edit';
import Users from './components/Users';
import Categories from './components/categorie'
import Suggestion from './components/Suggestion'
import PrivateRoute from './components/PrivateRoute';


import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
  //setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
                <PrivateRoute exact path="/" component={ Home } />
                <PrivateRoute exact path="/users" component={ Users } />
                <PrivateRoute exact path="/addAdmin" component={ Register } />
                <PrivateRoute exact path="/categories" component={ Categories } />
                <PrivateRoute exact path="/suggestion" component={ Suggestion } />
                <PrivateRoute path='/edit/:id' component={ Edit } />
                <div className="container">
                  <Route exact path="/login" component={ Login } />
                </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
