import React from "react";
import PropTypes from "prop-types";
import axios from 'axios'
// import * as API from "../../api/clusternodeapi";
import * as API from "../../api/api";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import {nodeURL} from '../../config.js'
 
// import App1 from '../../layouts/GoogleMaps/app.js'

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
  var data = [];
var Chartist = require("chartist");
  

class Dashboard extends React.Component {

  state = {
    value: 0,
    //Data to be fetched from MySQL DB into array below.It will store bothe cluster and node data.
    clusterNodeData : [],
    data1: {}
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

    //Func to fetch data through API call--> Fetches node/sensor details.
  // getClusterNodeData(){
  //       axios.get(`${nodeURL}/getdashboard`)
  //       .then(response => response.json())
  //       .then(response => {this.setState({clusterNodeData : response.data})
  //       console.log(this.state.clusterNodeData);})
  //       .catch(err => console.error(err))
// }
//Code ends here for DB fetch.

  //Call func to retrieve data from API.
  // componentDidMount() {
  //   console.log("Component did mount is running....");
  //   this.getClusterNodeData();
  //   console.log("After data is fetched!!!");
  // }
  //Need to update this func
  // renderInfo = ({id_node_master, node_location}) => <div key={id_node_master}>{node_location}</div>

  componentDidMount(){
    axios
      .get(`${nodeURL}/getdashboard`)
      .then(response => {
        console.log(response);
        this.setState({
          data1: response.data
        });
        console.log(this.state.data1);
      });
  }

//Code start to fetch using API module
componentWillMount() {
  console.log("Running component will mount....")

  API.fetchSensorData()
      .then((res) => {
          //console.log("status " +[res]);
          if (res) {
              console.log(' Success')
              this.setState({
                  isLoggedIn: true,
                  sensorData: res
              });
              data = res;
              //console.log("state " +data[0].sensor_make);
              this.props.history.push('/dashboard');
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

    // API.fetchClustserNodeData()
    //     .then((res) => {
    //         //console.log("status " +[res]);
    //         if (res) {
    //             console.log(' Success')
    //             this.setState({
    //                 clusterNodeData: res
    //             });
    //             data = res;
    //             //console.log("state " +data[0].sensor_make);
    //             this.props.history.push('/dashboard');
    //         } else if (res.status === '401') {
    //             console.log("No records");
    //             this.setState({
    //                 isLoggedIn: true,
    //                 message: "No cluster or node details found..!!",
    //             });
    //         } else if (res.status === '402') {
    //             this.setState({
    //                 isLoggedIn: false,
    //                 message: "Session Expired..!!",
    //             });
    //             this.props.history.push('/login');
    //         }
    //     });
}
//Code end to fetch using API module

  render() {
    const { classes } = this.props;
    var self = this;
    var i = 0;
    // var infoDict = this.props.data;
    console.log('map', data)
    // console.log('Before for loop')
    // for (var key in infoDict) {
    //       // arr.push(dict[key]);
    //       console.log("Inside.")
    //       console.log(i, "--> ", infoDict[key])
    //       i += 1;
    //   }
    var clusterdatadict = this.state.data1['clusterdata'];
    var totalclusters = this.state.data1['totalclusters'];
    var activeclusters = this.state.data1['activeclusters'];
    var maintenanceclusters = this.state.data1['maintenanceclusters'];
    var nodedataDict = this.state.data1['nodedata'];
    var totalnodes = this.state.data1['totalnodes'];
    var activenodes = this.state.data1['activenodes'];
    var maintenancenodes = this.state.data1['maintenancenodes'];
    var sensordataDict = this.state.data1['sensordata'];
    var totalsensors = this.state.data1['totalsensors'];
    var activesensors = this.state.data1['activesensors'];
    var maintenancesensors = this.state.data1['maintenancesensors'];

    var humiditysensors = this.state.data1['humiditysensors'];
    var pollutionsensors = this.state.data1['pollutionsensors'];
    var lightsensors = this.state.data1['lightsensors'];
    var temperaturesensors = this.state.data1['temperaturesensors'];

    var piechart1 = new Chartist.Pie('.ct-chart1', {labels: [`Inactive=${totalclusters - activeclusters - maintenanceclusters}`, `Active = ${activeclusters}`, `Maintenance = ${maintenanceclusters}`],
  series: [totalclusters - activeclusters - maintenanceclusters, activeclusters, maintenanceclusters]
}, {
  labelOffset: 35,
  labelDirection: 'explode'
});

var piechart2 = new Chartist.Pie('.ct-chart2', {labels: [`Temperature = ${temperaturesensors}`, `Humidity = ${humiditysensors}`, `Pollution = ${pollutionsensors}`, `Light = ${lightsensors}`],
  series: [temperaturesensors,humiditysensors, pollutionsensors, lightsensors]
},{
  labelOffset: 35,
  labelDirection: 'explode'
});
var piechart3 = new Chartist.Pie('.ct-chart3', {labels: [`Inactive = ${totalnodes - activenodes - maintenancenodes}`, `Active = ${activenodes}`, `Maintenance = ${maintenancenodes}`],
  series: [totalnodes - activenodes - maintenancenodes, activenodes, maintenancenodes]
}, {
  labelOffset: 30,
  labelDirection: 'explode'
});

var piechart4 = new Chartist.Pie('.ct-chart4', {labels: [`Inactive=${totalsensors - activesensors - maintenancesensors}`, `Active = ${activesensors}`, `Maintenance = ${maintenancesensors}`],
  series: [totalsensors - activesensors - maintenancesensors, activesensors, maintenancesensors]
}, {
  labelOffset: 20,
  labelDirection: 'explode'
});

    // var cluster1 = clusterdatadict[0]
    // console.console.log("cluster[0] : ", cluster1);

      console.log('- Cluster data:', clusterdatadict)
      // console.log(typeof clusterdatadict)
      // console.log("Lets check this : ", Object.values(clusterdatadict))
      // console.log('- Cluster data[0]:', clusterdatadict[0])
      console.log('node data:', nodedataDict)
      console.log(typeof nodedataDict)
      console.log('Total clusters:', totalclusters)
      console.log('Total nodes:', totalnodes)
      console.log('Active clusters:', activeclusters)
      console.log('Active nodes:', activenodes)
      console.log(typeof totalclusters,typeof totalnodes,typeof activeclusters,typeof activenodes)

// SENSOR DATA only
const sensorData = data.map((function(item){
    return(
        <tr key={item.id_sensor_master_pk} onClick={self.handleClick} className="odd ProjectTable-row project-details">
            {/*changed coloumn names as per mongo db column names*/}
            <td className='ProjectTable-cell '>{item.id_sensor_master_pk}</td>
            <td className=' '>{item.sensor_model}</td>
            <td>{(new Date(item.sensor_add_date)).toLocaleDateString()}</td>
            <td className='ProjectTable-cell'>{item.sensor_location}</td>
            <td className='ProjectTable-cell'>{item.status}</td>
          </tr>
        )
}))
//SENSOR DATA fetched
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>wb_cloudy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}><b>Clusters</b><br/> My Smart City</p>
                <h3 className={classes.cardTitle}>
                  Total: {totalclusters}</h3>
                  <h3 className={classes.cardTitle}>
                  Active: {activeclusters}</h3>
             <h3 className={classes.cardCategory}>California, USA</h3>
           {/*}       <h3 className={classes.cardCategory}> within 4 zones in the USA</h3>
                  <h3 className={classes.cardCategory}> east, west, north and south</h3>
                </h3> */}
              </CardHeader>
         {/*}     <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Requesting more clusters
                  </a>
                </div>
              </CardFooter> */}
            </Card>
          </GridItem>

     {/*}     <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>local_atm</Icon>
                </CardIcon>
                <p className={classes.cardCategory}><b>Billing Details</b> From:11/20/18   To:10/20/18</p>
                <h3 className={classes.cardTitle}>$245</h3>
                <p className={classes.cardCategory}>Due on: 12/05/18</p>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 30 days
                </div>
              </CardFooter>
            </Card>
          </GridItem> */}

           <GridItem xs={12} sm={6} md={3}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart4"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>All Available Sensors</h4>
                
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Just updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>wb_incandescent</Icon>
                </CardIcon>
                <p className={classes.cardTitle}>Sensors</p>
                <h3 className={classes.cardCategory}>Total : {totalsensors}</h3>
                <h3 className={classes.cardCategory}>Active : {activesensors}</h3>
                <h3 className={classes.cardCategory}>Pollution : {pollutionsensors}</h3>
                <h3 className={classes.cardCategory}>Temperature : {temperaturesensors}</h3>
                <h3 className={classes.cardCategory}>Humidity : {humiditysensors}</h3>
                <h3 className={classes.cardCategory}>Luminosity : {lightsensors}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from AWS IoT
                </div>
              </CardFooter>
            </Card>
          </GridItem>     

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}><b>Nodes</b><br/> My Smart City</p>
                <h3 className={classes.cardTitle}>Total: {totalnodes}</h3>
                <h3 className={classes.cardTitle}>Active: {activenodes}</h3>
                <h3 className={classes.cardCategory}>California, USA</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
       
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph style={{}}
                  className="ct-chart1"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />    
             {/*}   {piechart}*/}
              </CardHeader> 
              <CardBody>
                <h4 className={classes.cardTitle}>Cluster Status</h4>
            {/*}     <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 78%,
                  </span>{" "}
                  increase in performance by 7%.
                </p>  */}
              </CardBody> 
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>  
          </GridItem>
          
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart2"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>All Available Sensors</h4>
                
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Just updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart3"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Node Status</h4>
                <p className={classes.cardCategory}>
                  Just updated
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime/> updated every 30 minutes
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        {
          //This is where the new sensor/node/cluster tables/feed comes in
        }

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Sensor Statistics</h4>
                <p className={classes.cardCategoryWhite}>
                  Below are the live sensor statistics from cloud database
                </p>
              </CardHeader>
             <table className='ProjectTable' tableHeaderColor="primary">
                <thead className='ProjectTable-head'>
                <tr>
                    <th className='ProjectTable-header'>Sensor ID</th>
                    <th className='ProjectTable-header'>Sensor Type</th>
                    <th className='ProjectTable-header'>Active Since</th>
                    <th className='ProjectTable-header'>Location</th>
                    <th className='ProjectTable-header'>Status</th>
                </tr>
                </thead>
                <tbody>
                {/*{nameslist}  */}
               {sensorData}  
                </tbody>
            </table>  
              </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
           {/*}  <Card>
             <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Node Statistics</h4>
                <p className={classes.cardCategoryWhite}>
                  Below are the live node statistics from cloud database
                </p>
              </CardHeader>
                <table className='ProjectTable' tableHeaderColor="primary">
                  <thead className='ProjectTable-head'>
                  <tr>
                      <th className='ProjectTable-header'>Node ID</th>
                      <th className='ProjectTable-header'>Active Since</th>
                      <th className='ProjectTable-header'>Location</th>
                      <th className='ProjectTable-header'>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {/*{nameslist}  
                {sensorData} 
                  </tbody>
              </table>    
            </Card> */}
          </GridItem>
        {/*}   <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
               <h4 className={classes.cardTitleWhite}>Cluster Statistics</h4>
                <p className={classes.cardCategoryWhite}>
                  Below are the live cluster statistics from cloud database
                </p>
              </CardHeader>
               <table className='ProjectTable' tableHeaderColor="primary">
                  <thead className='ProjectTable-head'>
                  <tr>
                      <th className='ProjectTable-header'>Cluster ID</th>
                      <th className='ProjectTable-header'>Active Since</th>
                      <th className='ProjectTable-header'>Location</th>
                      <th className='ProjectTable-header'>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {/*{nameslist}
                 {sensorData}  
                  </tbody>
              </table>  
            </Card>
          </GridItem> */}
        </GridContainer>
        {
          //Sensor/Node/Cluster live feed data from DB will end here. Below will be Maintenance and TODOs.
        }
     {/*}   <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Maintenance",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "To Do's",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1, 2, 3, 4]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Overall Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  As on Tuesday 20th November, 2018.
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Details", "Zone"]}
                  tableData={[
                    ["CL045761", "Cluster P", "24 Nodes attached", "us-west-1"],
                    ["ND217261", "P-Node-261 ", "3 working sensors", "us-east-4"],
                    ["SR919943", "261-SR-002", "Motion sensor", "us-east-4"],
                    ["CL673244", "Cluster E", "15 Nodes connected successfully", "us-south-5"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>  */}
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);