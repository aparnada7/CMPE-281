var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set("debug", true);

mongoose.connect('mongodb://root:mysmartcity1@ds051534.mlab.com:51534/my_smart_city', {poolSize: 1000, useNewUrlParser: true}).then(() => {
    console.log("Connection to MongoDB establsihed");
  })
  .catch(err => {
    console.log("Connection to MongoDB unsuccessful");
  });;

module.exports = {mongoose};