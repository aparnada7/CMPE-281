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
class addSensor extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        sensordata: {
            sensorID:'',
            sensor_make: '',
            sensor_model: '',
            location: '',
            status: '',
            nodeId: '',
            sensorType: '',
            createdBy: ''
        },
        updatesensordata: {
            usensorID:'',
            usensor_make: '',
            usensor_model: '',
            ulocation: '',
            ustatus: '',

            usensorType: '',
            ucreatedBy: ''
        },
        isFound: false,
        delmessage:'',
        updatemessage:''

    };

    componentWillMount() {
        this.setState({
            sensorID:'',
            sensor_make: '',
            sensor_model: '',
            location:'',
            status:'',
            nodeId:'',
            sensorType: '',
            createdBy: '',

            delmessage:'',
            updatemessage:'',

            usensorID:'',
            usensor_make: '',
            usensor_model: '',
            ulocation: '',
            ustatus: '',
            usensorType: '',

        });

        API.fetchSensorData()
            .then((res) => {
                //console.log("status " +[res]);
                if (res) {
                    console.log(' Success')
                    this.setState({
                        isLoggedIn: true,
                        sensordata: res
                    });
                    data = res;
                    console.log('ID: ', this.state.sensordata.sensorID)
                    console.log('map', data)
                    this.props.history.push('/addSensor');
                } else if (res.status === '401') {
                    console.log("No records");
                    this.setState({
                        isLoggedIn: true,
                        message: "No Senosrs found..!!",
                    });
                } else if (res.status === '402') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Session Expired..!!",
                    });
                    this.props.history.push('/login');
                }
            });
    }

    handleSubmit = () => {
        API.addSensor(this.state.sensordata)
            .then((res) => {
                if (res) {
                    this.setState({
                        message: "Sensor Added!!",
                    });
                    this.props.history.push("/addSensor");
                } else if (res.status === '401') {
                    console.log("in fail");
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });

                }
            });
    };

    handleSearch = (usensorID) => {
      alert("Searching ....."+usensorID);
      this.setState({
     usensorID: usensorID
      });

      console.log('Update ID: ', this.state.updatesensordata.usensorID)
      // console.log("Particular data: ", )
      for(let i = 0; i < data.length; i++){
        if(data[i].id_sensor_master_pk == usensorID){
          // this.usensor_make = data[i].sensor_make
          // this.usensor_type = data[i].sensor_type
          // this.ulocation = data[i].sensor_location
          // this.usensor_model = data[i].sensor_model
          // this.ustatus = data[i].status

          this.setState({usensorType : data[i].sensor_type})
          this.setState({usensor_make : data[i].sensor_make})
          this.setState({usensor_model : data[i].sensor_model})
          this.setState({ulocation : data[i].sensor_location})
          this.setState({ustatus : data[i].status})

          console.log("FOUNDDDDDDDDDDDDDDD")
          console.log("UMake : ", this.usensor_make)
          console.log("UType : ", this.usensorType)
          console.log("ULocation : ", this.ulocation)
          console.log("UModel : ", this.usensor_model)
          console.log("UStatus : ", this.ustatus)
          // this.state.sensordata.sensor_make = this.sensor_make;
          // console.log("FOUNDDDDDDDDDDDDDDD : ", this.state.sensordata.sensor_make)
        }
        else if( i < data.length){
          console.log("searching")
          // alert("SEnsor ID ", sensorID, " not found. Please try other ID.")

        }
        // else if(i == data.length-1){
        //   console.log("NOT FOUND SORRY")
        //
        // }
      }

    }

    handleDelSearch = (sensorID) => {
      alert("Searching ....."+sensorID);
      this.setState({
     sensorID: sensorID,
     isFound: true
      });

      console.log('ID: ', this.state.sensordata.sensorID)
      // console.log("Particular data: ", )
      for(let i = 0; i < data.length; i++){
        if(data[i].id_sensor_master_pk == sensorID){
          this.setState({sensor_type : data[i].sensor_type})
          this.setState({sensor_make : data[i].sensor_make})
          this.setState({sensor_model : data[i].sensor_model})
          this.setState({sensor_location : data[i].sensor_location})
          this.setState({status : data[i].status})


          console.log("FOUNDDDDDDDDDDDDDDD", this.isFound)
          console.log("Make : ", this.sensor_make)
          console.log("Type : ", this.sensor_type)
          console.log("Location : ", this.sensor_location)
          console.log("Model : ", this.sensor_model)
          console.log("Status : ", this.status)
          // this.state.sensordata.sensor_make = this.sensor_make;
          // console.log("FOUNDDDDDDDDDDDDDDD : ", this.state.sensordata.sensor_make)
        }
        else if( i < data.length){
          console.log("searching")
          // alert("SEnsor ID ", sensorID, " not found. Please try other ID.")

        }
        // else if(i == data.length-1){
        //   console.log("NOT FOUND SORRY")
        //
        // }
      }

    }

    handleUpdate = () => {
      alert("Updating .....");
      this.setState({updatemessage : 'Below sensor updated!!'})
      this.setState({usensorType : ''})
      this.setState({usensor_make : ''})
      this.setState({usensor_model : ''})
      this.setState({ulocation : ''})
      this.setState({ustatus : ''})
      this.setState({usensorID : ''})

    }

    handleDelete = () => {
      alert("Deleting .....");
      this.setState({sensor_type : ''})
      this.setState({sensor_make : ''})
      this.setState({sensor_model : ''})
      this.setState({sensor_location : ''})
      this.setState({status : ''})
      this.setState({sensorID : ''})
      this.setState({delmessage : 'Below sensor deleted!!'})
      // this.setState({state.sensordata.sensorID: ''})
      // document.getElementById("sensorDelType").innerHTML="BlahBlah"
      // this.setState({sensor_type : ''})
      // this.setState({sensor_make : data[i].sensor_make})
      // this.setState({sensor_model : data[i].sensor_model})
      // this.setState({sensor_location : data[i].sensor_location})
      // this.setState({status : data[i].status})n

    }

    componentDidUpdate(){
      console.multerConfig
    }

    render() {
        const {classes, ...rest} = this.props;
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
                        <div className="dashboard_tab  tab-clicked"><NavLink to="icons">Sensor Simulation</NavLink></div>
                        <div className="dashboard_tab"> <NavLink to="/addSensor">Configure Sensor</NavLink></div>
                    </div>
                </div>

                {//SECTION ADD NODE starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>ADD SENSOR</h4>
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
                                        Select Node : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.nodeId}
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

                                        </select> &nbsp; &nbsp;<br/>

                                        Select Sensor Type : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.sensorType}
                                                              onChange={(event) => {
                                                                  this.setState({
                                                                      sensordata: {
                                                                          ...this.state.sensordata,
                                                                          sensorType: event.target.value
                                                                      }
                                                                  });
                                                              }} >
                                        <option value="select" >Select </option>
                                        <option value="Temperature" >Temperature</option>
                                        <option value="Humidity" >Humidity</option>
                                        <option value="Light" >Light</option>
                                        <option value="Pollution" >Pollution</option>

                                    </select> &nbsp; &nbsp;<br/>

                                        Sensor Location: <input type="text" className="form-control" placeholder="Enter Sensor Location" value={this.state.sensordata.location}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                sensordata: {
                                                                    ...this.state.sensordata,
                                                                    location: event.target.value
                                                                }
                                                            });
                                                        }}/><br/>

                                    Sensor Make: <input type="text" className="form-control" placeholder="Enter Sensor Make" value={this.state.sensordata.sensor_make}

                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_make: event.target.value
                                                   }
                                               });
                                           }}/> <br/>
                                    Sensor Model: <input type="text" className="form-control" placeholder="Enter Sensor Model" value={this.state.sensordata.sensor_model}
                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_model: event.target.value
                                                   }
                                               });


                                           }}/><br/>

                                        Select Default Status : <select id="ddlNode" className="form-control input-lg" value={this.state.sensordata.status}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             sensordata: {
                                                                                 ...this.state.sensordata,
                                                                                 status: event.target.value
                                                                             }
                                                                         });
                                                                     }} >
                                        <option value="Active" >Active</option>
                                        <option value="InActive" >InActive</option>
                                        <option value="Turn On" >Turn On</option>
                                    </select> &nbsp; &nbsp; <br/>


                                        <Button bsStyle="success" bsSize="sm" block
                                            onClick={() => this.handleSubmit()}> Add Sensor </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION ADD SENSOR stops
                }

                {//SECTION UPDATE SENSOR starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>UPDATE SENSOR</h4>
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
                                        {this.state.updatemessage && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.updatemessage}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">
                                    Search by Sensor ID: <input type="text" className="form-control" placeholder="Enter Sensor ID" value={this.state.updatesensordata.usensorID}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            updatesensordata: {
                                                                ...this.state.updatesensordata,
                                                                usensorID: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                                    <Button bsStyle="info" bsSize="sm" block
                                                        onClick={() => this.handleSearch(this.state.updatesensordata.usensorID)}> Search </Button>
                                                    <hr/>

                                      Sensor Type: <input type="text" className="form-control" placeholder="Sensor Type" value={this.state.usensorType}
                                                                    onChange={(event) => {
                                                                        this.setState({
                                                                            updatesensordata: {
                                                                                ...this.state.updatesensordata,
                                                                                usensorType: event.target.value
                                                                            }
                                                                        });
                                                                    }}/><br/>



                                        Update Location: <input type="text" className="form-control" placeholder="Enter Sensor Location" value={this.state.ulocation}
                                                        onChange={(event) => {
                                                            this.setState({
                                                                updatesensordata: {
                                                                    ...this.state.updatesensordata,
                                                                    ulocation: event.target.value
                                                                }
                                                            });
                                                        }}/><br/>


                                    Update Sensor Make: <input type="text" className="form-control" placeholder="Enter Sensor Make" value={this.state.usensor_make}

                                           onChange={(event) => {
                                               this.setState({
                                                   updatesensordata: {
                                                       ...this.state.updatesensordata,
                                                       usensor_make: event.target.value
                                                   }
                                               });
                                           }}/> <br/>
                                    Update Sensor Model: <input type="text" className="form-control" placeholder="Enter Sensor Model" value={this.state.usensor_model}
                                           onChange={(event) => {
                                               this.setState({
                                                   updatesensordata: {
                                                       ...this.state.updatesensordata,
                                                       usensor_model: event.target.value
                                                   }
                                               });


                                           }}/><br/>

                                      Update Status : <select id="ddlNode" className="form-control input-lg" value={this.state.ustatus}
                                                                     onChange={(event) => {
                                                                         this.setState({
                                                                             updatesensordata: {
                                                                                 ...this.state.updatesensordata,
                                                                                 ustatus: event.target.value
                                                                             }
                                                                         });
                                                                     }} >
                                        <option value="Active" >Active</option>
                                        <option value="InActive" >InActive</option>
                                        <option value="Turn On" >Turn On</option>
                                    </select> &nbsp; &nbsp; <br/>



                                            <Button bsStyle="primary" bsSize="sm" block
                                                onClick={() => this.handleUpdate()}> Update Sensor </Button>

                                </div>
                                </div>

                            </Hidden>

                        </CardBody>
                    </Card>
                </GridItem>
                {//SECTION UPDATE SENSOR stops
                }


                {//SECTION DELETE SENSOR starts
                }
                <GridItem xs={102} sm={102} md={102}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <h4 className={classes.cardTitleWhite}>DELETE SENSOR</h4>
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
                                        {this.state.delmessage && (
                                            <div className="alert alert-warning" role="alert">
                                                {this.state.delmessage}
                                            </div>
                                        )}
                                        {/*</div>*/}
                                    </div>
                                    <div className="dropdown">


                                    Search by Sensor ID: <input type="text" className="form-control" placeholder="Enter Sensor ID" value={this.state.sensordata.sensorID}
                                                    onChange={(event) => {
                                                        this.setState({
                                                            sensordata: {
                                                                ...this.state.sensordata,
                                                                sensorID: event.target.value
                                                            }
                                                        });
                                                    }}/><br/>
                                                    <Button bsStyle="info" bsSize="sm" block
                                                        onClick={() => this.handleDelSearch(this.state.sensordata.sensorID)}> Search </Button>
                                                    <hr/>

                                    Sensor Type: <input type="text" id="sensorDelType" className="form-control" readonly="readonly" placeholder="Sensor Type"
                                    value={this.state.sensor_type}

                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_make: event.target.value
                                                   }
                                               });
                                           }}/> <br/>

                                  Sensor Location: <input type="text" className="form-control" readonly="readonly" placeholder="Sensor Location" value={this.state.sensor_location}
                                                          onChange={(event) => {
                                                              this.setState({
                                                                  sensordata: {
                                                                      ...this.state.sensordata,
                                                                      sensor_model: event.target.value
                                                                  }
                                                              });


                                                          }}/><br/>
                                    Sensor Make: <input type="text" className="form-control" readonly="readonly" placeholder="Sensor Make" value={this.state.sensor_make}
                                                  onChange={(event) => {
                                                      this.setState({
                                                          sensordata: {
                                                              ...this.state.sensordata,
                                                              sensor_make: event.target.value
                                                          }
                                                      });

                                                  }}/> <br/>
                                    Sensor Model: <input type="text" className="form-control" readonly="readonly" placeholder="Sensor Model" value={this.state.sensor_model}
                                           onChange={(event) => {
                                               this.setState({
                                                   sensordata: {
                                                       ...this.state.sensordata,
                                                       sensor_model: event.target.value
                                                   }
                                               });


                                           }}/><br/>
                                   Sensor Status: <input type="text" className="form-control" readonly="readonly" placeholder="Sensor Status" value={this.state.status}
                                                  onChange={(event) => {
                                                      this.setState({
                                                          sensordata: {
                                                              ...this.state.sensordata,
                                                              sensor_model: event.target.value
                                                          }
                                                      });


                                                  }}/><br/>


                                                <Button bsStyle="danger" bsSize="sm" block
                                                    onClick={() => this.handleDelete()}> Delete Sensor </Button>

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

addSensor.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(addSensor);
