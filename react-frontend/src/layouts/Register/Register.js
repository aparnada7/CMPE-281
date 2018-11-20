import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
import {AppBar, Tabs, Tab} from 'material-ui'

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import Background from 'assets/img/background1.jpg';

const divStyle = {

};

const opacityLayer = {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const headingTitle = {
  color: 'white',
  fontSize: '25px',
  fontWeight:'bold',
  fontFamily:'Roboto',
  display: 'flex',
  padding: 20,
  justifyContent: 'center'
};

const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.35)',
  padding: 25,
  width: 350,
};

const buttonStyle = {
  marginTop:30,
  display: 'flex',
  justifyContent: 'center'
};

class Register extends Component {
  
  constructor(props){
    super(props);
    this.state={
      user_name:'',
      email:'',
      password:'',
      repassword:'',
      usertype:'',
      contactNumber:''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    event.preventDefault();
    if (this.state.password !== this.state.repassword) {
      console.log("Passwords do not match!");
      return;
    } else {
      console.log("Passwords match!");
    }

    var apiBaseUrl = "http://localhost:3001";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.email.length>0 && this.state.password.length>0){
      var payload={
      "username": this.state.user_name,
      "email":this.state.email,
      "password":this.state.password,
      "usertype":0,
      "contactNumber":this.state.contactNumber
      }
      axios.post(apiBaseUrl+'/signup', payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code === 200){
          console.log("registration successfull..");
         // var loginscreen=[];
         // loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         // var loginmessage = "Not Registered yet.Go to registration";
         // self.props.parentContext.setState({loginscreen:loginscreen,
         // loginmessage:loginmessage,
         // buttonLabel:"Register",
         // isLogin:true
         //  });
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
    // var userhintText,userLabel;
    // if(this.props.role === "student"){
    //   userhintText="Enter your Student Id",
    //   userLabel="Student Id"
    // }
    // else{
    //   userhintText="Enter your Teacher Id",
    //   userLabel="Teacher Id"
    // }
    return (
      <div style={divStyle}>
        <div style={opacityLayer}>
          <Panel style={panelStyle}>
            <h1 style={headingTitle}> New User Registration  </h1>
            <Form horizontal className="RegisterForm" id="registerForm">

              <FormGroup controlId="userName">
                <FormControl type="text" placeholder="User Name"
                onChange = {(event) => this.setState({user_name: event.target.value })} />
              </FormGroup>
            
              <FormGroup controlId="email">
                <FormControl type="email" placeholder="Email address"
                onChange = {(event) => this.setState({email: event.target.value })} />
              </FormGroup>

              <FormGroup controlId="formPassword">
                <FormControl type="password" placeholder="Password"
                onChange = {(event) => this.setState({password: event.target.value })} />
              </FormGroup>

              <FormGroup controlId="formRePassword">
                <FormControl type="password" placeholder="Retype Password" 
                onChange = {(event) => this.setState({repassword: event.target.value })} />
              </FormGroup>

              <FormGroup controlId="contactNumber">
                <FormControl type="number" placeholder="Contact Number" maxLength="10"
                onChange = {(event) => this.setState({contactNumber: event.target.value })} />
              </FormGroup>

              <FormControl componentClass="select" placeholder="select">
                <option value="select">Role</option>
                <option value="other">Client</option>
                <option value="other">IOT Manager</option>
                <option value="other">User</option>
              </FormControl>
              <FormGroup style={buttonStyle} controlId="formSubmit">
               
                <Button bsStyle="primary" type="submit" onClick={this.handleClick}>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </Panel>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 50,
};

export default Register;