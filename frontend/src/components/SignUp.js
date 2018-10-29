import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_no: '',
      Password: '',
      Name: '',
      Aadhar: '',
      route: 'signup'
    }
  }

  onPhoneNumberChange = (event) => {
    this.setState({phone_no: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({Password: event.target.value})
  }

  onNameChange = (event) => {
      this.setState({Name: event.target.value})
  }

  onAadharChange = (event) => {
      this.setState({Aadhar: event.target.value})
  }

  onSignInClick = () => {
    this.setState({route: "signin"})
  }

  onSignUp = () => {
    fetch('http://localhost:8080/signup', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.Name,
        aadhar: this.state.Aadhar,
        phoneNumber: this.state.phone_no,
        password: this.state.Password
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data === false){
        alert('Error Signing up. Check credentials');
      }
      else{
        sessionStorage.setItem('token', data.token);
        this.setState({route: "home"});
      }
    })
  }
  
  render() {
    if(this.state.route === 'signup'){
      return (
        <div>
          <Form>
            <FormGroup>
              <h1>Sign Up</h1>
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input onChange={this.onNameChange} type="text" placeholder="Enter Name" />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input onChange={this.onPhoneNumberChange} type="text" placeholder="Enter Phone Number" />
            </FormGroup>
            <FormGroup>
              <Label>Aadhar Number</Label>
              <Input onChange={this.onAadharChange} type="text" placeholder="Enter Aadhar Number" />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input onChange={this.onPasswordChange} type="password" placeholder="Enter Password  " />
            </FormGroup>
            <FormGroup>
              <Button onClick={this.onSignUp} color="primary" size="lg" block>Sign Up</Button>
            </FormGroup>
            <FormGroup>
              <a onClick={this.onSignInClick} className="f6 link dim black db" href="#0">
                Sign in
              </a>
            </FormGroup>
          </Form>
        </div>
      );
    }
    else if (this.state.route === 'home'){
      return(
        <Redirect to="/home"/>
      );
    }
    else if(this.state.route === 'signin'){
      return(
        <Redirect to="/"/>
      );
    }
  }
}

export default SignUp;
