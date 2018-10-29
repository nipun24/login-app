import React, { Component } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {BrowserRouter, Route} from 'react-router-dom';  
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {
            id: '',
            name: '',
            phoneNumber: '',
            aadhar: '',
            password: ''
          }
    }
  };

  loadUser = (data) => {
    this.setState({user: { 
        id: data.id,
        name: data.name,
        phoneNumber: data.phone_no,
        aadhar: data.aadhar,
        password: data.password 
    }})
  }

  render() {
      return(
        <BrowserRouter>
            <div>
            <Route 
                exact path="/"
                render={() => (
                    <SignIn loadUser={this.loadUser} />
                )} 
            />
            <Route 
                exact path="/home"
                render={() => (
                    <Home phoneNumber={this.state.user.phoneNumber}  />
                )} 
            />
            <Route 
                exact path="/signup"
                render={() => (
                    <SignUp loadUser={this.loadUser} />
                )} 
            />
            </div>
        </BrowserRouter>
      );
    }
}

export default App;
