var jwt = require('jwt-simple');
var moment = require('moment');
var crypto = require('crypto');
var path = require('path');
var secrets = require('../config/secrets');
var config = secrets();

/**
 * Model.
 */
var User = require('../models/User');

var tokenSecret = config.sessionSecret;



function createJwtToken(user) {
    var temp = {
        _id: user._id,
        slug: user.profile.slug
    };
    var payload = {
        user: temp,
        iat: new Date().getTime(),
        exp: moment().add(7, 'days').valueOf()
    };
    return jwt.encode(payload, tokenSecret);
};

exports.isLogin2 = function(req, res, next) {

    if (req.headers.authorization) {
        var token = req.headers.authorization;
        //.split(' ')[1];
        try {
            var decoded = jwt.decode(token, tokenSecret);
            if (decoded.exp <= Date.now()) {
                res.status(400).send('Access token has expired');
            } else {
                req.user = decoded.user;
                return next();
            }
        } catch (err) {
            return res.status(500).send('Error parsing token');
        }
    } else {
        return next();
    }
};

exports.isLogin = function(req, res, next) {

    if (req.headers.authorization) {
        var token = req.headers.authorization;
        //.split(' ')[1];
        try {
            var decoded = jwt.decode(token, tokenSecret);
            if (decoded.exp <= Date.now()) {
                res.status(400).send('Access token has expired');
            } else {
                req.user = decoded.user;
                return next();
            }
        } catch (err) {
            return res.status(500).send('Error parsing token');
        }
    } else {
        return res.status(401);
    }
};

exports.signup = function(req, res, next) {
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        anonymous: req.body.anonymous,
        'profile.username': req.body.username
    });
    user.save(function(err, user, numberAffected) {
        if (err) res.send(err);
        else {
         res.status(200).send('Succesfully Signed Up');
        }

    });
};

exports.login = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (!user) return res.status(401).send('User does not exist');
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (!isMatch) return res.status(401).send('Invalid email and/or password');
            var token = createJwtToken(user);
            var tempy = {
                profile: user.profile
            };
            res.send({
                token: token,
                user: tempy
            });
        });
    });
};

exports.facebookAuth = function(req, res) {
    var profile = req.body.profile;
    var signedRequest = req.body.signedRequest;
    var encodedSignature = signedRequest.split('.')[0];
    var payload = signedRequest.split('.')[1];

    var appSecret = 'fc5a36cb1fa441c60b629ee6bc65bc85';

    var expectedSignature = crypto.createHmac('sha256', appSecret).update(payload).digest('base64');
    expectedSignature = expectedSignature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    if (encodedSignature !== expectedSignature) {
        return res.send(400, 'Invalid Request Signature');
    }

    User.findOne({
        email: profile.email
    }, function(err, existingUser) {
        if (existingUser) {
            var token = createJwtToken(existingUser);
            var tempy = {
                profile: user.profile
            };
            return res.send({
                token: token,
                user: tempy
            });
        }
        var user = new User();

        user.email = profile.email;
        user.name = profile.name;
        user.save(function(err) {
            if (err) return next(err);
            else{
                var token = createJwtToken(user);
                var tempy = {
                    profile: user.profile
                };
                res.send({
                    token: token,
                    user: tempy
                });
            }
            
        });
    });
};

exports.googleAuth = function(req, res) {
    var profile = req.body.profile;
    User.findOne({
        email: profile.emails[0].value
    }, function(err, existingUser) {
        if (err) res.send(err);

        if (existingUser) {
            console.log('heere');
            var token = createJwtToken(existingUser);
            var tempy = {
                profile: user.profile
            };
            return res.send({
                token: token,
                user: tempy
            });
        }
        var user = new User();
        user.name = profile.displayName;
        user.email = profile.emails[0].value;
        user.save(function(err) {
            if (err) return next(err);
            else{
                var token = createJwtToken(user);
            var tempy = {
                profile: user.profile
            };
            res.send({
                token: token,
                user: tempy
            });
            }
            
        });
    });
};

exports.getUser = function(res, req){
    User.findOne({slug: req.params.uslug},function(err, user){
        if(err)
            res.send(err);
        else{
            res.json(user);
        }
    });
};

exports.hasEmail = function(req, res, next) {
    if (!req.query.email) {
        return res.send(400, {
            message: 'Email parameter is required.'
        });
    }

    User.findOne({
        email: req.query.email
    }, function(err, user) {
        if (err) return next(err);
            console.log(user);
        res.send({
            available: !user
        });
    });
}; 