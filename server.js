/**
 * Module dependencies.
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');


var _ = require('lodash');
var path = require('path');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/**
 * Controllers (route handlers).
 */

var homeController = require('./controllers/home');
var complaintController = require('./controllers/complaint');


/**
 * API keys and Passport configuration.
 */
var config = require('./config/secrets');
var secrets = config();

/**
 * Create Express server.
 */

var app = express();

/**
 * Connect to MongoDB.
 */

mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var hour = 3600000;
var day = hour * 24;
var week = day * 7;


/**
 * Express configuration.
 */

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));
app.locals.moment = require('moment');

app.get('/', function(request, response){
    response.render('home');
});
app.get('/api/complaints', complaintController.getComplaints);        
app.get('/api/complaints/:id', complaintController.getComplaint);        
app.post('/api/complaints/add', complaintController.postAddComplaint);     
app.put('/api/complaints/:id', complaintController.putUpdateComplaint);       
app.delete('/api/complaints/:id', complaintController.deleteComplaint);       
/*
// Handle 404
app.use(function(req, res) {
  res.status(400);
 res.render('404.jade', {title: '404: File Not Found'});
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
 res.render('500.jade', {title:'500: Internal Server Error', error: error});
});
*/

/**
 * 500 Error Handler.
 */

app.use(errorHandler());

/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
