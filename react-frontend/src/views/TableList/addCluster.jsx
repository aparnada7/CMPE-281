import React, {Component} from "react";
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

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};
var data = [];
class addCluster extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        sensordata: {
            sensor_make: '',
            sensor_model: '',
            location: '',
            status: '',
            nodeId: '',
            sensorType: '',
            createdBy: ''
        }
    };

    componentWillMount() {
        this.setState({
            sensor_make: '',
            sensor_model: '',
            location:'',
            status:'',
            nodeId:'',
            sensorType: '',
            createdBy: ''
        });
    }

    handleSubmit = () => {
        API.addCluster(this.state.sensordata)
            .then((res) => {
                if (res) {
                    this.setState({
                        message: "Cluster Added!!",
                    });
                    this.props.history.push("/addCluster");
                } else if (res.status === '401') {
                    console.log("in fail");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });

                }
            });
    };

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
            <GridContainer>
                <div className="main-content text-left">
                    <div className="dashboard_tab_wrapper text-left">
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Cluster Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addCluster">Cluster Management</NavLink></div>
                    </div>
                </div>
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite} text-align="center" >ADD CLUSTER</h4>
                              <h6 className={classes.cardTitleWhite}>Please select options from below</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Hidden only={["sm", "xs"]}>
                                <div style={divStyle1}>
                                    {/*<div>*/}
                                    {/*<div>*/}
                                    <div >
                                        {/*<div className="col-md-3">*/}
                                        {this.state.message && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">
                                        Select Cluster : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.nodeId}
                                                onChange={(event) => {
                                                    this.setState({
                                                        sensordata: {
                                                            ...this.state.sensordata,
                                                            nodeId: event.target.value
                                                        }
                                                    });
                                                }} >
                                            <option value="1" >1</option>
                                            <option value="2" >2</option>
                                            <option value="3" >3</option>
                                            <option value="4" >4</option>
                                            <option value="5" >5</option>

                                        </select> &nbsp; &nbsp;<br/>

                                        Select Zone : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.sensorType}
                                                              onChange={(event) => {
                                                                  this.setState({
                                                                      sensordata: {
                                                                          ...this.state.sensordata,
                                                                          sensorType: event.target.value
                                                                      }
                                                                  });
                                                              }} >
                                        <option value="East" >East</option>
                                        <option value="West" >West</option>
                                        <option value="North" >North</option>
                                        <option value="South" >South</option>

                                    </select> &nbsp; &nbsp;<br/>

                                    Enter Cluster ID: <input type="text" className="form-control" placeholder="Enter Node ID" value={this.state.sensordata.location}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            sensordata: {
                                                                ...this.state.sensordata,
                                                                location: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                        Cluster Location: <input type="text" className="form-control" placeholder="Enter Node Location" value={this.state.sensordata.location}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                sensordata: {
                                                                    ...this.state.sensordata,
                                                                    location: event.target.value
                                                                }
                                                            });
                                                        }}/><br/>

                                    Cluster Make: <input type="text" className="form-control" placeholder="Enter Node Make" value={this.state.sensordata.sensor_make}

                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_make: event.target.value
                                                   }
                                               });
                                           }}/> <br/>
                                                                                   Select Default Cluster Status : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.status}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             sensordata: {
                                                                                 ...this.state.sensordata,
                                                                                 status: event.target.value
                                                                             }
                                                                         });
                                                                     }} >
                                        <option value="Active" >Active</option>
                                        <option value="Turn On" >Turn On</option>
                                        <option value="InActive" >InActive</option>
                                        <option value="Turn On" >Turn Off</option>
                                        <option value="Turn On" >Maintenance</option>
                                    </select> &nbsp; &nbsp; <br/>


                                        <Button bsStyle="success" bsSize="sm" block
                                            onClick={() => this.handleSubmit()}> Confirm </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>

                {//SECTION UPDATE NODE starts
                }

                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite} text-align="center" >UPDATE CLUSTER</h4>
                              <h6 className={classes.cardTitleWhite}>Please select options from below</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Hidden only={["sm", "xs"]}>
                                <div style={divStyle1}>
                                    {/*<div>*/}
                                    {/*<div>*/}
                                    <div >
                                        {/*<div className="col-md-3">*/}
                                        {this.state.message && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">
                                        Select Cluster : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.nodeId}
                                                onChange={(event) => {
                                                    this.setState({
                                                        sensordata: {
                                                            ...this.state.sensordata,
                                                            nodeId: event.target.value
                                                        }
                                                    });
                                                }} >
                                            <option value="1" >1</option>
                                            <option value="2" >2</option>
                                            <option value="3" >3</option>
                                            <option value="4" >4</option>
                                            <option value="5" >5</option>

                                        </select> &nbsp; &nbsp;<br/>

                                        Select Zone : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.sensorType}
                                                              onChange={(event) => {
                                                                  this.setState({
                                                                      sensordata: {
                                                                          ...this.state.sensordata,
                                                                          sensorType: event.target.value
                                                                      }
                                                                  });
                                                              }} >
                                        <option value="East" >East</option>
                                        <option value="West" >West</option>
                                        <option value="North" >North</option>
                                        <option value="South" >South</option>

                                    </select> &nbsp; &nbsp;<br/>

                                    Enter Cluster ID: <input type="text" className="form-control" placeholder="Enter Node ID" value={this.state.sensordata.location}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            sensordata: {
                                                                ...this.state.sensordata,
                                                                location: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                        Cluster Location: <input type="text" className="form-control" placeholder="Enter Node Location" value={this.state.sensordata.location}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                sensordata: {
                                                                    ...this.state.sensordata,
                                                                    location: event.target.value
                                                                }
                                                            });
                                                        }}/><br/>

                                    Cluster Make: <input type="text" className="form-control" placeholder="Enter Node Make" value={this.state.sensordata.sensor_make}

                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_make: event.target.value
                                                   }
                                               });
                                           }}/> <br/>
                                                                                   Select Default Cluster Status : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.status}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             sensordata: {
                                                                                 ...this.state.sensordata,
                                                                                 status: event.target.value
                                                                             }
                                                                         });
                                                                     }} >
                                        <option value="Active" >Active</option>
                                        <option value="Turn On" >Turn On</option>
                                        <option value="InActive" >InActive</option>
                                        <option value="Turn On" >Turn Off</option>
                                        <option value="Turn On" >Maintenance</option>
                                    </select> &nbsp; &nbsp; <br/>



                                            <Button bsStyle="primary" bsSize="sm" block
                                                onClick={() => this.handleSubmit()}> Update Cluster </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>

                {//SECTION UPDATE NODE stops
                }

                {//SECTION DELETE NODE starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite} text-align="center" >DELETE CLUSTER</h4>
                              <h6 className={classes.cardTitleWhite}>Please select options from below</h6>
                            <p className={classes.cardCategoryWhite}>
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Hidden only={["sm", "xs"]}>
                                <div style={divStyle1}>
                                    {/*<div>*/}
                                    {/*<div>*/}
                                    <div >
                                        {/*<div className="col-md-3">*/}
                                        {this.state.message && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.message}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">
                                        Select Cluster : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.nodeId}
                                                onChange={(event) => {
                                                    this.setState({
                                                        sensordata: {
                                                            ...this.state.sensordata,
                                                            nodeId: event.target.value
                                                        }
                                                    });
                                                }} >
                                            <option value="1" >1</option>
                                            <option value="2" >2</option>
                                            <option value="3" >3</option>
                                            <option value="4" >4</option>
                                            <option value="5" >5</option>

                                        </select> &nbsp; &nbsp;<br/>

                                        Select Zone : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.sensorType}
                                                              onChange={(event) => {
                                                                  this.setState({
                                                                      sensordata: {
                                                                          ...this.state.sensordata,
                                                                          sensorType: event.target.value
                                                                      }
                                                                  });
                                                              }} >
                                        <option value="East" >East</option>
                                        <option value="West" >West</option>
                                        <option value="North" >North</option>
                                        <option value="South" >South</option>

                                    </select> &nbsp; &nbsp;<br/>

                                    Enter Cluster ID: <input type="text" className="form-control" placeholder="Enter Node ID" value={this.state.sensordata.location}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            sensordata: {
                                                                ...this.state.sensordata,
                                                                location: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                        Cluster Location: <input type="text" className="form-control" placeholder="Enter Node Location" value={this.state.sensordata.location}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                sensordata: {
                                                                    ...this.state.sensordata,
                                                                    location: event.target.value
                                                                }
                                                            });
                                                        }}/><br/>

                                    Cluster Make: <input type="text" className="form-control" placeholder="Enter Node Make" value={this.state.sensordata.sensor_make}

                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_make: event.target.value
                                                   }
                                               });
                                           }}/> <br/>
                                                                                   Select Default Cluster Status : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.status}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             sensordata: {
                                                                                 ...this.state.sensordata,
                                                                                 status: event.target.value
                                                                             }
                                                                         });
                                                                     }} >
                                        <option value="Active" >Active</option>
                                        <option value="Turn On" >Turn On</option>
                                        <option value="InActive" >InActive</option>
                                        <option value="Turn On" >Turn Off</option>
                                        <option value="Turn On" >Maintenance</option>
                                    </select> &nbsp; &nbsp; <br/>



                                                <Button bsStyle="danger" bsSize="sm" block
                                                    onClick={() => this.handleSubmit()}> Delete Cluster </Button>
                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION DELETE NODE stops
                }


            </GridContainer>
            </div>
            </div>
        );

    }
}

addCluster.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(addCluster);
