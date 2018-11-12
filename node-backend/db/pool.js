var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'rr',
    database: 'my_smart_city'
})

pool.getConnection(function(err, connection) {
  if (err) console.log('Connection to MySQL DB failed');
  else
  console.log("Connection to MySQL DB establsihed");
  connection.release();
});

module.exports = pool;