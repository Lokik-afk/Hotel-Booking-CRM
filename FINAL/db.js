
const mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://guptalokik7:NgusAo8oNcGuJ7uY@cluster0.sd4r6az.mongodb.net/golakot';

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});

var connection = mongoose.connection;


connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function() {
    console.log("Connection Successful!");
});

module.exports = mongoose;