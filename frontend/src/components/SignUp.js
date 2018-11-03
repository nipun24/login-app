import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { TextField, Button, Grid, Typography, Card, Dialog, DialogActions, DialogTitle, CircularProgress } from '@material-ui/core';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_no: '',
      Password: '',
      Name: '',
      Aadhar: '',
      route: 'signup',
      alert: false
    }
  }

  componentDidMount = () => {
    const token = sessionStorage.getItem('token');
    if(token !== null){
      this.setState({route: 'home'});
    }
  }

  handleAlertClose = () => {
    this.setState({alert: false})
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
    this.setState({route: 'loading'});
    fetch('https://infinite-hamlet-28839.herokuapp.com/signup', {
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
        this.setState({alert: true});
        this.setState({route: "signup"})
      }
      else{
        sessionStorage.setItem('token', data.token);
        this.setState({route: "home"});
      }
    })
  }
  
  render() {
    if(this.state.route === 'loading'){
      return(
        <Grid container justify="center" alignItems="center" style={{marginTop: "300px"}}>
          <CircularProgress style={{color: "#ffffff"}}/>
        </Grid>
      );
    }
    else if(this.state.route === 'signup'){
      return (
        <div style={{marginTop: '50px'}}>
        <Grid container justify="center" alignItems="center">
          <Card style={{padding: '50px'}}>
            <Grid container direction="column" justify="center" alignItems="center">
              <Typography variant="h3">
                Sign Up
              </Typography>
              <TextField
                type="text"
                label="Enter Name"
                placeholder="Enter Name"
                margin="normal"
                onChange={this.onNameChange}
              />
              <TextField
                type="text"
                label="Enter Aadhar Number"
                placeholder="Enter Aadhar Number"
                margin="normal"
                onChange={this.onAadharChange}
              />
              <TextField
                type="text"
                label="Enter Phone Number"
                placeholder="Enter Phone Number"
                margin="normal"
                onChange={this.onPhoneNumberChange}
              />
              <TextField
                type="password"
                label="Enter Password"
                placeholder="Enter Phone Number"
                margin="normal"
                onChange={this.onPasswordChange}
              />
              <Button variant="contained" color="primary" onClick={this.onSignUp} style={{marginTop: '20px'}}>
                Sign Up
              </Button> 
              <Typography style={{ cursor: 'pointer', marginTop: '20px' }} onClick={this.onSignInClick}>
                Sign In?
              </Typography>
            </Grid>
          </Card>
        </Grid>
        <Dialog
          open={this.state.alert}
          onClose={this.handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle>{"Error Signing Up!!"}</DialogTitle>
        <DialogActions>
          <Button onClick={this.handleAlertClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
        </Dialog>
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
