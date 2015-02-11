var secrets = require('../config/secrets');
var User = require('../models/User');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var crypto = require('crypto');
var moment = require('moment');
var jwt = require('jwt-simple');
var graph = require('fbgraph');
var _ = require('lodash');

/**
 * GET /api
 * List of API examples.
 */

exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};

function createAccessToken(user) {
  var payload = {
    user: user,
    iat: new Date().getTime(),
    exp: moment().add('days', 7).valueOf()
  };
  return jwt.encode(payload, secrets.facebook.tokenSecret);
}
/**
 * Post /api/auth/signup
 * Signup post request
 */
exports.isLogin = function (req, res, next) {
  if (req.headers.authorization) {
    var token = req.headers.authorization.split(' ')[1];
    try {
      var decoded = jwt.decode(token, secrets.facebook.tokenSecret);
      if (decoded.exp <= Date.now()) {
        res.send(400, 'Access token has expired');
      } else {
        req.user = decoded.user;
        return next();
      }
    } catch (err) {
      return res.send(500, 'Error parsing token');
    }
  } else {
    return res.send(401);
  }
}

/**
 * Post /api/auth/signup
 * Signup post request
 */
exports.postSignUp =  function(req, res, next) {
console.log(req.body.gender+"lol")
  var user = new User({
  
    
                profile:
                {firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender:req.body.gender},
                email:req.body.email,
                username: req.body.username,
	 	 		password:req.body.password, 
  
  });
  user.save(function(err) {
    if (err) return next(err);
    res.send(200);
  });
};


/**
 * Post /auth/login
 * Login post request
 */
exports.postLogin = function(req, res, next) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (!user) return res.send(401, 'User does not exist');
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) return res.send(401, 'Invalid email and/or password');
      var token = createAccessToken(user);
      res.send({ token: token });

    });
  });
};

