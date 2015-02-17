var config = require('../config/secrets');
var User = require('../models/User');
var secrets = config()
  , path           = require('path')
  , templatesDir   = path.resolve(__dirname, '..', 'templates')
 /* , emailTemplates = require('email-templates') */ //Not Used currently
  , nodemailer     = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Mandrill',
  auth: {
    user: secrets.mandrill.user,
    pass: secrets.mandrill.password
  }
});


/**
 * POST /contact
 * Send a contact form via Nodemailer.
 * @param email
 * @param name
 * @param message
 */
// exports.contactUs = function(req, res, next){
//   req.to = 'mail@bbitbrothers.in';
//   req.subject = req.body.subject;
//   req.email = 'Name: ' + req.body.name + '\nEmail: ' + req.body.email + '\nMessage ' + req.body.message;
//   next();
// };

exports.sendEmail = function(req, res) {
  var from = 'mail@goahack.com';

  var mailOptions = {
    to: req.to,
    from: from,
    subject: req.subject ,
    text: req.email
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      res.send(err);
    }
    else {
      if(req.pass){
        console.log('emailllll');
        res.json({
            message:'Password Changed Succesfully'
        });
      }
      else if(req.promote){
        res.json({
          message:'Citizen Promoted'
        });
      }
      else if(req.demote){
        res.json({
          message:'Staff Demoted'
        });
      }
      else{
        res.json({
          message:'Mail Sent'
        });
      }
    };
  });
};

exports.sendEmailToFollowers = function(req, res){
  var from = 'mail@goahack.com';
  if(req.status){
    for(var i = 0;i <= req.followers.length-1;i++){
            User.findById(req.followers[i]._id,function(err, user1){
                if(err)
                    res.send(err);
                else if(!user1){
                    console.log('User Not Found');
                }
                else{
                  var mailOptions = {
                    to: user1.email,
                    from: from,
                    subject: "Complaint Status Updated" ,
                    text: req.email
                  };

                  transporter.sendMail(mailOptions, function(err) {
                    if (err) 
                      res.send(err);
                  });
                }
            });
        };
        res.json({
          message:"Complaint Status Updated"
        });
  }
  else if(req.del){
        for(var i = 0;i <= req.followers.length-1;i++){
            User.findById(req.followers[i]._id,function(err, user1){
                if(err)
                    res.send(err);
                else if(!user1){
                    console.log('User Not Found');
                }
                else{
                  var mailOptions = {
                    to: user1.email,
                    from: from,
                    subject: "Complaint Deleted" ,
                    text: req.email
                  };

                  transporter.sendMail(mailOptions, function(err) {
                    if (err) 
                      res.send(err);
                  });
                }
            });
        };
        res.json({
          message:"Complaint Deleted"
        });
  }
  else if(req.update){
      for(var i = 0;i <= req.followers.length-1;i++){
        User.findById(req.followers[i]._id,function(err, user1){
            if(err)
                res.send(err);
            else if(!user1){
                console.log('User Not Found');
            }
            else{
              var mailOptions = {
                to: user1.email,
                from: from,
                subject: "Complaint Updated" ,
                text: req.email
              };

              transporter.sendMail(mailOptions, function(err) {
                if (err) 
                  res.send(err);
              });
            }
        });
    };
    res.json({
      message:"Complaint Updated"
    });

  }

  
};