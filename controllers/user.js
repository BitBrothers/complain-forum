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
 req.flag = true;
 next();
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
        if(req.flag){
            next();
        }
        else{
        res.status(401).send('Unauthorized');   
        }
        
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
                profile: user.profile,
                role: user.role
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
                profile: existingUser.profile,
                role: existingUser.role
            };
            return res.send({
                token: token,
                user: tempy
            });
        }
        var user = new User();

        user.email = profile.email;
        user.profile.username = profile.name;
        user.save(function(err) {
            if (err) return next(err);
            else{
                var token = createJwtToken(user);
                var tempy = {
                    profile: user.profile,
                    role: user.role
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
                profile: existingUser.profile,
                role: existingUser.role
            };
            return res.send({
                token: token,
                user: tempy
            });
        }
        var user = new User();
        user.profile.name = profile.displayName;
        user.email = profile.emails[0].value;
        user.save(function(err) {
            if (err) return next(err);
            else{
                var token = createJwtToken(user);
            var tempy = {
                profile: user.profile,
                role: user.role
            };
            res.send({
                token: token,
                user: tempy
            });
            }
            
        });
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

exports.getUser = function(req, res){
    User.findOne({'profile.slug':req.params.uslug})
    .select('-_id profile role complaints')
    .populate({
        path:'complaints._id',
        select: 'slug title description category subcategory location status startdate enddate'
    })
    .exec(function(err, user){
        if(err)
            res.send(err);
        else if(!user){
            res.status(404).send('User Not Found');
        }
        else{
            res.json(user);
        }
    });
};

exports.getUserLog = function(req, res){
    User.findOne({
        'profile.slug':req.params.uslug
    },function(err, user){
        if(err)
            res,send(err);
        else {
            res.json(complaint.log);
        }
    });
};

exports.changeUserPassword = function(req, res, next){
    console.log(req.body);
    User.findById(req.user._id,function(err, user){
        if(err)
            res.send(err);
        else if(!user){
            res.status(404).send('User Not Found');
        }
        else{
            user.comparePassword(req.body.oldPassword,function(err, isMatch){
                if(err)
                    res.send(err);
                else if(!isMatch){
                    res.status(401).send('Invalid Old Password');
                }
                else{
                    user.password = req.body.newPassword;
                    user.save(function(err, user){
                        if(err)
                            res.send(err);
                        else{
                            req.pass = true;
                            req.to = user.email;
                            req.subject = "ForChange Password Change";
                            req.email = "Your Current Password for ForChange has been changed";
                            next();
                        }
                    });
                }
            });

        }
    });
};








