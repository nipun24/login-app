import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInPhoneNumber: '',
      signInPassword: '',
      route: 'signin',
    }
  }

  onPhoneNumberChange = (event) => {
    this.setState({signInPhoneNumber: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        phoneNumber: this.state.signInPhoneNumber,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data === false){
          alert('Invalid Phone Number or Passowrd');
        }
        else{
          sessionStorage.setItem('token', data.token);
          this.setState({route: "home"});
        }
      })
  }

  onSignUpClick = () => {
    this.setState({route: "signup"})
  }
  
  render() {
    if(this.state.route === 'signin'){
      return (
        <div>
          <Form>
            <FormGroup>
              <h1>Sign In</h1>
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input onChange={this.onPhoneNumberChange} type="text" placeholder="Enter Email" />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input onChange={this.onPasswordChange} type="password" placeholder="Enter Password" />
            </FormGroup>
            <FormGroup>
              <Button onClick={this.onSignIn} color="primary" size="lg" block>Sign In</Button>
            </FormGroup>
            <FormGroup>
              <a onClick={this.onSignUpClick} className="f6 link dim black db" href="#0">
                Sign up
              </a>              
            </FormGroup>
          </Form>
        </div>
      );
    }
    else if (this.state.route === 'signup'){
      return(
        <Redirect to="/signup"/>
      );
    }
    else if (this.state.route === 'home'){
      return(
        <Redirect to="/home"/>
      );
    }
  }
}

export default SignIn;
