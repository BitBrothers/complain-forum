var Complaint = require('../models/Complaint');
var User = require('../models/User');

exports.postAddComplaint = function(req, res) {
    User.findById(req.user._id,function(err,user){
        if(err)
            res.send(err);
        else{
            var complaint = new Complaint();
            complaint.title = req.body.title;
            complaint.description = req.body.description;
            complaint.category = req.body.category;
            complaint.subcategory = req.body.subcategory;
            complaint.location = req.body.location;
            complaint.userId = user._id;
            user.complaints.push({
                _id: complaint._id
            });
            complaint.save(function(err) {
                if (err)
                    res.send(err);
                else{
                    user.save(function(err){
                        if(err)
                            res.send(err);
                        else{
                            res.json({
                                message: 'Complaint created!'
                            });
                        }
                    });
                    
                }
       
            });
        }
    });

};

exports.deleteComplaint = function(req, res) {
    User.findById(req.user._id, function(err,user){
        if(err)
            res.send(err);
        else{
            Complaint.findOne({
                slug:req.params.cslug},
                function(err,complaint){
                    if(err)
                        res.send(err);
                    else if(!complaint){
                        res.status(404).send('Complaint not found');
                    }
                    else{
                        if(user.complaints.id(complaint._id)){
                            user.complaints.pull({
                                _id:complaint._id
                            });
                            complaint.remove();
                            user.save(function(err){
                                if(err)
                                    res.send(err);
                                else{
                                    res.json({
                                        message:'Successfully Deleted complaint'
                                    });
                                }
                            });
                        }
                        else{
                            res.status(401).send('Unauthorized');
                        }
                    }
                });
        }
    });

};

exports.getComplaints = function(request, response) {
    Complaint.find(function(error, complaints) {
        if (error)
            response.send(error);
        response.json(complaints);
    });
};

exports.getComplaint = function(request, response) {
    Complaint.findOne({slug:request.params.cslug},function(error, complaint) {
        if (error)
            response.send(error);
        response.json(complaint);
    });
};



exports.putUpdateComplaint = function(request, response) {
        User.findById(request.user._id, function(err,user){
        if(err)
            response.send(err);
        else{
            Complaint.findOne({
                slug:request.params.cslug},
                function(err,complaint){
                    if(err)
                        response.send(err);
                    else if(!complaint){
                        response.status(404).send('Complaint not found');
                    }
                    else{
                        if(user.complaints.id(complaint._id)){
                         complaint.title = request.body.title;
                         complaint.description = request.body.description;
                         complaint.category = request.body.category;
                         complaint.subcategory = request.body.subcategory;
                         complaint.location = request.body.location;


                         complaint.save(function(err) {
                             if (err)
                                 response.send(err);
 
                             response.json({
                                 message: 'Complaint updated!'
                             });
                        });
                        }
                        else{
                            response.status(401).send('Unauthorized');
                        }
                    }
                });
        }
    });

};

exports.followComplaint = function(req, res){
    User.findById(
        req.user._id,
        function(err, user){
        if(err)
            res.send(err);
        else{
            Complaint.findOne({
                slug:req.params.cslug
            },
                function(err, complaint){
                if(err)
                    res.send(err);
                else if(!complaint){
                    res.status(404).send('Complaint Not Found');
                }
                else{
                    if(complaint.followers.id(user._id)){
                        res.status(500).send('Already Followed Complaint');
                    }
                    else{
                        complaint.followers.push({
                            _id:user._id
                        });
                        complaint.save(function(err){
                            if(err)
                                res.send(err);
                            else{
                                res.json({
                                    message:'Successfully Followed Complaint'
                                });
                            }
                        });
                    }


                }
            });
        }
    });
};

exports.upvoteComplaint = function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err)
            res.send(err);
        else{
            Complaint.findOne({
                slug:req.params.cslug
            },
            function(err, complaint){
                if(err)
                    res.send(err);
                else if(!complaint){
                    res.status(404).send('Complaint Not Found');
                }
                else{
                    if(complaint.upvotes.id(user._id)){
                        res.status(500).send('Already Upvoted');
                    }
                    else{
                        complaint.upvotes.push({
                            _id:user._id
                        });
                        complaint.save(function(err){
                            if(err)
                                res.send(err);
                            else{
                                res.json({
                                    message:'Upvoted complaint'
                                });
                            }
                        });
                    }
                }
            });
        }
    });
};

exports.unfollowComplaint = function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err)
            res.send(err);
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
                    if(complaint.followers.id(user._id)){
                        complaint.followers.pull({
                            _id:user._id
                        });
                        complaint.save(function(err){
                            if(err)
                                res.send(err);
                            else{
                                res.json({
                                    message:'Successfully Unfollowed'
                                });
                            }
                        });
                    }
                    else{
                        res.status(500).send('Not Follwed Complaint');
                    }
                }
            });
        }
    });
};

exports.commentComplaint = function(req, res){
    User.findById(req.user._id,function(err, user){
        if(err)
            res.send(err);
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
                    if(req.body.description && req.body.description != ""){
                        complaint.comments.push({
                            _id:user._id,
                            description:req.body.description
                        });
                        complaint.save(function(err){
                            if(err)
                                res.send(err);
                            else{
                                res.json({
                                    message:'Comment added'
                                });
                            }
                        });
                    }
                    else{
                        res.status(500).send('Send comment description');
                    }

                }
            });
        }
    });
};


