var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport=require('passport');
var session = require('express-session');
//var LocalStrategy=require('passport-local').Strategy;

var app = express();

var port = process.env.PORT || 3000;

//var User=require('models/User.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"BLAHSECRETS"}));
app.use(passport.initialize());
app.use(passport.session());

//Controllers
var complaintController = require('./controllers/complaint');
var userController = require('./controllers/user');
var homeController = require('./controllers/home');
var apiController = require('./controllers/api');



//Mongo db


//TODO Create a secrets.js file
mongoose.connect('mongodb://localhost:27017/');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

app.post('/login', function(req,res,next){
    var auth=passport.authenticate('local',function(err,user){
        if(err)
            return next(err);
        if(!user)
            res.send({success:false});
        req.logIn(user, function(err){
            if(err)
                return next(err);
            res.send({success:true,user:user});
        })
    })
    auth(req,res,next);
})

/**
 * Login Apis
 */
app.post('/api/auth/signup', apiController.postSignUp);
app.post('/api/auth/login', apiController.postLogin);
//app.post('/api/auth/facebook', apiController.postFacebookLogin);
//app.post('/api/auth/google', apiController.postGoogleLogin);
//app.get('/api/users', apiController.getUsers);


//user
app.get('/', homeController.index);


app.post('/api/user', userController.addUser);
app.put('/api/user/:user_id', userController.updateUser);
app.get('/api/complaints', complaintController.getallComplaints);

/** Ser***/
app.get('/api/complaint/:slug', complaintController.getComplaint);
app.post('/api/complaint', complaintController.addComplaint);
app.put('/api/complaint/:slug', complaintController.updateComplaint);
app.get('/api/complaint/searchstat/:status', complaintController.searchStatus);
app.get('/api/complaint/searchloc/:location', complaintController.searchLocation);



//staff
app.delete('/api/complaint/staff/:complaint_id', complaintController.deleteComplaint);
app.put('/api/complaint/staff/:complaint_id', complaintController.staffUpdateComplaint);

//admin
app.get('/api/admin/user', userController.getAllUser);
app.delete('/api/admin/user/:user_id', userController.deleteUser);
app.get('/api/admin/user/:user_id', userController.searchUserId);




app.listen(port);
console.log('Listening at.......' + port);


module.exports = app;
