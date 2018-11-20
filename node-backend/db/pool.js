var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 1000,
    port: '3306',
    host: 'dbinstance281-3.cw07bx5twhkg.us-west-1.rds.amazonaws.com',
    user: 'dbuser',
    password: 'mysmartcity',
    database: 'my_smart_city'
})

pool.getConnection(function(err, connection) {
  if (err) console.log('Connection to MySQL DB failed');
  else
  console.log("Connection to MySQL DB establsihed");
  connection.release();
});

module.exports = pool;