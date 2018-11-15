      
      
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
//import { withRouter } from 'react-router-dom';
import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import dashboardRoutes from "routes/dashboard.jsx";
import { Panel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
//import Register from './Register';

const divStyle = {
};

const headingTitle = {
  fontSize: '25px',
  color: 'black',
  fontWeight:'bold',
  fontFamily:'Roboto',
  display: 'flex',
  justifyContent: 'center'
};

const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.35)',
  border: 10,
  padding: 20,
  // paddingLeft: 20,
  // paddingRight: 20,
  width: 300,
};

const buttonStyle = {
  marginTop:30,
  display: 'flex',
  justifyContent: 'center'
};


class LoginForm extends React.Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }
  // routeChange(e){
  //   e.preventDefault();
  //   console.log("gdhag");
  //   let path = `/dashboard`;
  //   this.props.history.push(path);
  // }
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = (e) => {
    e.preventDefault();
    console.log("FORM Register!");
    if (this.state.redirect) {
      return <Redirect to= '/Dashboard' />
    }
  }
  handleFormSubmit(e) {
    e.preventDefault();

    console.log("FORM SUBMIT!");

  }
  handleFormRegister(e) {
    e.preventDefault();
    console.log("FORM Register!");
    this.setRedirect();
  }

  render() {
    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
          <h1 style={headingTitle}> User Login </h1>
          <Form horizontal className="LoginForm" id="loginForm">
            <FormGroup controlId="formEmail">
              <FormControl type="email" placeholder="Email Address" />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl type="password" placeholder="Password" />
            </FormGroup>

            <FormControl componentClass="select" placeholder="select">
        <option value="select">Role</option>
        <option value="other">Client</option>
        <option value="other">IOT Manager</option>
        <option value="other">User</option>
      </FormControl>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button style={{ marginRight: 20},{marginLeft:20}} bsStyle="primary" type="submit" onClick={this.handleFormSubmit}>
                Login
              </Button>
              <Button style={{ marginLeft: 30}}bsStyle="primary" type="submit" onClick={this.setRedirect}>
                Register
              </Button>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    )
  }
}

export default LoginForm;
