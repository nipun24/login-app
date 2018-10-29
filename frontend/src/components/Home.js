import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'home',
      userInfo: {
        id: '',
        name: '',
        phoneNumber: '',
        aadhar: '',
        password: ''
      }
    }
  };

  updateUserInfo = (data) => {
    this.setState({userInfo: { 
      id: data.id,
      name: data.name,
      phoneNumber: data.phone_no,
      aadhar: data.aadhar,
      password: data.password 
  }})
  }

  onLogout = () => {
    this.setState({route: 'signin'});
    sessionStorage.removeItem('token');
  }

  componentDidMount = () => {
    fetch('https://infinite-hamlet-28839.herokuapp.com/home', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        token: sessionStorage.getItem('token'),
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data === false){
          alert('Error Retreiving data');
        }
        else{
          this.updateUserInfo(data);
        }
      })
  }

  render() {
      if(this.state.route === 'home'){
        return(
          <div className="ma4 flex flex-column tc">
              <div className="ba flex flex-column db">
                <p className="f1 ma2 b">User Information</p>
                <p className="f3 ma2 b">ID</p>
                <p className="f3 ma2">{this.state.userInfo.id}</p>
                <p className="f3 ma2 b">Name</p>
                <p className="f3 ma2">{this.state.userInfo.name}</p>
                <p className="f3 ma2 b">Phone Number</p>
                <p className="f3 ma2">{this.state.userInfo.phoneNumber}</p>
                <p className="f3 ma2 b">Aadhar Card Number</p>
                <p className="f3 ma2">{this.state.userInfo.aadhar}</p>
                <p className="f3 ma2 b">Password</p>
                <p className="f3 ma2">{this.state.userInfo.password}</p>
              </div>
              <div className="ma4">
                <a 
                  onClick={this.onLogout}
                  className="f6 link dim ba ph3 pv2 mb2 dib black grow" 
                  href="#0">
                  Logout
                </a>
              </div>
          </div>
  
        );
      }
      else if(this.state.route === 'signin'){
        return(
          <Redirect to="/"/>
        );
      }
    }
}

export default Home;
