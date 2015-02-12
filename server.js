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
var userController = require('./controllers/user');



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

app.set('port', process.env.PORT || secrets.port);
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


//Login APIs
app.post('/api/auth/signup',userController.signup);
app.post('/api/auth/login',userController.login);
app.post('/api/auth/facebook', userController.facebookAuth);
app.post('/api/auth/google', userController.googleAuth);
app.get('/api/users', userController.hasEmail);

//Complaint APIs
app.put('/api/complaint/:cslug/follow', userController.isLogin, complaintController.followComplaint);  
app.put('/api/complaint/:cslug/unfollow', userController.isLogin, complaintController.unfollowComplaint);  
app.put('/api/complaint/:cslug/comment', userController.isLogin, complaintController.commentComplaint);  
app.put('/api/complaint/:cslug/upvote', userController.isLogin, complaintController.upvoteComplaint);  
app.get('/api/complaints', complaintController.getComplaints);
app.get('/api/complaint/:cslug', complaintController.getComplaint);
app.post('/api/complaint', userController.isLogin, complaintController.postAddComplaint);     
app.put('/api/complaint/:cslug', userController.isLogin, complaintController.putUpdateComplaint);       
app.delete('/api/complaint/:cslug', userController.isLogin, complaintController.deleteComplaint);


app.use(errorHandler());

/**
 * Start Express server.
 */

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
