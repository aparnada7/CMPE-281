const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var pool = require('../db/pool')

router.get('/getdashboard',function(req,res){
    console.log("Inside get total number of clusters Request");
    var reply = {}

    var sql = "SELECT id_cluster_master_pk, cluster_location, last_updated, status, createdby, date_format(cluster_add_date, '%d %M %Y') as cluster_add_date FROM cluster_master"
    var sql2 = "SELECT id_node_master, node_location, last_updated, cluster_node_id_fk, status, createdby, date_format(node_add_date, '%d %M %Y') as node_add_date FROM node_master"


    pool.getConnection(function(err, con) {
    if (err) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Could Not Get Connection Object");
    } else {
      con.query(sql, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid query");
        } else {
        //   res.writeHead(200, {
        //     "Content-Type": "application/json"
        //   });
        //   res.end(JSON.stringify(result));
        //   console.log(result);
          totalclusters = result.length
          activeclusters = result.filter((element)=>{
              return (element.status === 'Active')
          })
          activeclusters = activeclusters.length
        //   reply = {clusterdata: result,
        //   totalclusters: totalclusters,
        //   activeclusters: activeclusters
        //   }
        //   console.log(reply);
        //   res.end(JSON.stringify(reply));
        }
      });
        con.query(sql2, function(err, result) {
        if (err) {
          res.writeHead(400, {
            "Content-Type": "text/plain"
          });
          res.end("Invalid query");
        } else {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
        //   res.end(JSON.stringify(result));
        //   console.log(result);
          totalnodes = result.length
          activenodes = result.filter((element)=>{
              return (element.status === 'Active')
          })
          activenodes = activenodes.length
          reply = {clusterdata: result,
          totalclusters: totalclusters,
          activeclusters: activeclusters,
          nodedata: result,
          totalnodes: totalnodes,
          activenodes: activenodes,
          }
          console.log(reply);
          res.end(JSON.stringify(reply));
        }
      });


      con.release();
    }
  });

 
    });

module.exports = router