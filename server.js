var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();

var port = process.env.PORT || 3000; 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Controllers
var complaintcontroller=require('./controllers/complaint');
var usercontroller=require('./controllers/user');





//Mongo db



mongoose.connect('mongodb://localhost:27017/');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});





//user
app.post('/user',usercontroller.add_user);
app.put('/user/:user_id',usercontroller.update_user);


app.post('/complaint',complaintcontroller.add_complaint);
app.get('/complaint',complaintcontroller.getall_complaints);
app.put('/complaint/:complaint_id',complaintcontroller.update_complaint);
app.get('/complaint/:complaint_id',complaintcontroller.searchcomplaint_id);


//staff
app.delete('/complaint/staff/:complaint_id',complaintcontroller.delete_complaint);
app.put('/complaint/staff/:complaint_id',complaintcontroller.staff_update_complaint);

//admin
app.get('/admin/user',usercontroller.getall_user);
app.delete('/admin/user/:user_id',usercontroller.delete_user);
app.get('/admin/user/:user_id',usercontroller.searchuser_id);





































// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port);
console.log('Listening at.......' + port);


module.exports = app;
