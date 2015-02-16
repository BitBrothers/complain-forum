var Complaint = require('../models/Complaint');
var User = require('../models/User');

exports.changeToStaff = function(req, res){
	User.findById(req.user._id,function(err, user){
		if(err)
			res.send(err);
		else if(!user){
			res.status(404).send('User Not Found');
		}
		else{
			if(user.role == "admin"){
				User.findOne({'profile.slug':req.params.uslug},function(err, user1){///user to be made staff send slug in req.params.uslug
					if(err)
						res.send(err);
					else if(!user){
						res.status(404).send('User Not Found');
					}
					else{
						if(req.body.result == "true"){
							user1.role = "staff";
							user1.save(function(err){
								if(err)
									res.send(err);
								else{
									res.json({
										message:'Citizen Promoted'
									});
								}
							});
						}
						else if(req.body.result == "false"){
							user1.role = "citizen";
							user1.save(function(err){
								if(err)
									res.send(err);
								else{
									res.json({
										message:'Staff Demoted'
									});
								}
							});
						}
						else{
							res.status(412).send('Result Not Sent');
						}
					}
				});
			}
			else{
				res.status(401).send('Un-Authorized');
			}
		}
	});
};

exports.changeComplaintStatus = function(req, res){
	User.findById(req.user._id,
		function(err, user){
		if(err)
			res.send(err);
		else if(!user){
			res.status(404).send('User Not Found');
		}
		else{
			Complaint.findOne({
				slug:req.params.cslug
			},function(err, complaint){
				if(err)
					res.send(err);
				else if(!complaint){
					res.status(404).send('Complaint Not Found');
				}
				else{
					if(user.role == "admin" || user.role == "staff"){
						if(req.body.status){
							complaint.status = req.body.status;
							complaint.save(function(err){
								if(err)
									res.send(err);
								else{
									res.json({
										message:'Status Updated'
									});
								}
							});
						}
						else{
							res.status(412).send('Status Not Sent');
						} 
					}
					else{
						res.status(401).send('Un-Authorized');
					}
				}
			});
		}
	});
};

