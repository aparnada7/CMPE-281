import React, {Component} from "react";
import axios from 'axios'
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import * as API from "../../api/api";
import {Button} from 'react-bootstrap';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import {NavLink, withRouter, Route} from 'react-router-dom';
import '../common.css';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "routes/dashboard.jsx";
import App1 from '../../layouts/GoogleMaps/app.js'
import {nodeURL} from '../../config.js'

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};


  var data = [];
var Chartist = require("chartist");

class SensorData extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        node: '',
      startDate: '',
      endDate: '',
      nodeData: {}
    }
    this.nodeChangeHandler = this.nodeChangeHandler.bind(this)
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this)
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this)
    }

    startDateChangeHandler(date) {
    var d = new Date(date);
    // var e = d.toISOString();
    this.setState({startDate: d})
    console.log(this.state.startDate)
  }

  endDateChangeHandler(date) {
    var d = new Date(date);
    this.setState({endDate: d})
  }

  nodeChangeHandler(e) {
    this.setState({node: e.target.value})
  }

   submit = e => {
    e.preventDefault();
    console.log("Request to get node data");
    const data = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      node: this.state.node
    };
    console.log(data)
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    console.log(data);
    //make a post request with the user data
    axios.post(`${nodeURL}/node`, data).then(response => {
      console.log(response);
      if (response.status === 200) {
          this.setState({
            nodeData: response.data,
            // authFlag: true
          });
          console.log(this.state.nodeData)
      } 
    });
  }  

    render() {
        const { classes, ...rest } = this.props;
        // const {classes} = this.props;
        return (
          <div>
          <div>
            <Sidebar
              routes={dashboardRoutes}
              logoText={"My Smart City"}
              logo={logo}
              image={image}
              handleDrawerToggle={this.handleDrawerToggle}
              open={this.state.mobileOpen}
              color="blue"
              {...rest}
            />
            </div>

            <div>
            <GridContainer xs={225} sm={225} md={225}>
                <div className="main-content text-left">
                    <div className="dashboard_tab_wrapper text-left">
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Node Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addSensor">Node Maasdas</NavLink></div>
                    </div>
                </div>
                <GridItem xs={225} sm={225} md={225} >
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite} text-align="center" >Retrieve Sensor Information</h4>
                              <h6 className={classes.cardTitleWhite}>Click on any sensor on map to display its location</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        </Card>
                        </GridItem>
                        </GridContainer>
                        </div>

                       <div>
                        <GridContainer>                
                        <GridItem style = {{top: '5px'}}>
                        <div>
                        <h3>Active nodes</h3>
                        <App1 style = {{top: '5px'}}/>  
                        </div>
                        </GridItem>
                        
               {/*}         <GridItem xs={102} sm={102} md={102}>
                        
                        <div class="form-group">
   <br/>
    <label for="rg-from">Date Range:</label>
    <div>
    <DatePicker
              selected={Date.now()}
              onChange={this.startDateChangeHandler}
            /></div>
            <div><DatePicker
              selected={Date.now()}
              onChange={this.endDateChangeHandler}
            /></div>
            <button type="submit" class="btn btn-primary" onClick = {this.submit}>Submit</button>
  </div>
  
  
                        </GridItem>         */}
                        </GridContainer></div> 

             <div style = {{width: "55%", border: "1px lightgrey", "backgroundColor": "light-grey", position: "absolute", left: '700px', top: '0px', marginLeft: "20%", marginTop: "15%", padding: "25px", margin: "25px"}} >

                <form action="" role="form" class="form-inline">
                
  <div class="form-group">
    <label for="rg-from"><strong>Select Node:</strong></label>
   <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder={this.state.selectedNode} onChange={this.nodeChangeHandler} />
    <br/>
  </div>

  <div class="form-group">
    <label for="rg-from"><strong>Date Range:</strong></label>
    
  </div>
  <br/> 

  <div>
    <DatePicker
              selected={Date.now()}
              onChange={this.startDateChangeHandler}
            /></div><br/>
            <div><DatePicker
              selected={Date.now()}
              onChange={this.endDateChangeHandler} style={{position: "absolute", left: '750px'}}
            /><br/></div>
            <button type="submit" class="btn btn-primary" onClick = {this.submit}>Submit</button>
 
  </form>
  </div>
             
             
             
           {/*}         <div class="form-group" style={{position: 'absolute', left: '800px', top: '0px'}}>
   <br/>
   <label for="rg-from"><strong>Select Node:</strong></label>
    <input type="text" id="rg-from" name="rg-from"  class="form-control" placeholder={this.state.selectedNode} onChange={this.nodeChangeHandler} />
    <br/>
    <label for="rg-from"><strong>Date Range:</strong></label>
    <div>
    <DatePicker
              selected={Date.now()}
              onChange={this.startDateChangeHandler}
            /></div><br/>
            <div><DatePicker
              selected={Date.now()}
              onChange={this.endDateChangeHandler}
            /></div><br/>
            <button type="submit" class="btn btn-primary" onClick = {this.submit}>Submit</button>
  </div>    */}

            </div>
        )}
}

export default withStyles(iconsStyle)(SensorData);