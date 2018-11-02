import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Grid, Typography, Card, Table, TableBody, TableCell, TableRow, CircularProgress } from '@material-ui/core';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'loading',
      userInfo: {
        id: '',
        name: '',
        phoneNumber: '',
        aadhar: '',
        password: '',
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
    this.setState({route: 'home'})
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
          this.setState({route: 'signin'});
        }
        else{
          this.updateUserInfo(data);
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
    else if(this.state.route === 'home'){
      return(
        <div style={{marginTop: '50px'}}>
          <Grid container justify="center" alignItems="center">
            <Card style={{padding: '50px'}}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="display3">
                  User Information
                </Typography>
                <Table style={{marginTop: '24px'}}>
                  <TableBody>
                    <TableRow>
                      <TableCell>User ID</TableCell>
                      <TableCell>{this.state.userInfo.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{this.state.userInfo.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>{this.state.userInfo.phoneNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aadhar Number</TableCell>
                      <TableCell>{this.state.userInfo.aadhar}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Password</TableCell>
                      <TableCell>{this.state.userInfo.password}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button onClick={this.onLogout} variant="contained" color="primary" style={{marginTop: "20px"}}>
                  Logout
                </Button>
              </Grid>
            </Card>
          </Grid>
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
