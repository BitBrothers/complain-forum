var Complaint = require('../models/Complaint');
var User = require('../models/User');


exports.postAddComplaint = function(req, res) {
    User.findById(req.user._id,function(err,user){
        if(err)
            res.send(err);
        else if(!user){
            res.status(404).send('User Not Found');
        }
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
            complaint.followers.push({
                _id: user._id
            });
            user.log.push({
                entry:"Complaint Added -" + complaint.title
            });
            complaint.log.push({
                entry:"Complaint Created by -"+ user.profile.username
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
        else if(!user){
            res.status(404).send('User Not Found');
        }
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
    Complaint.find({status:'Pending'})
    .populate({
        path:'userId',
        select: 'profile.slug profile.username'
    })
    .select('-_id title location category subcategory slug status startdate userId')
    .exec(function(error, complaints1) {
        if (error)
            response.send(error);
        else{
            Complaint.find({status:'Resolved'})
            .populate({
                path:'userId',
                select: 'profile.slug profile.username'
            })
            .select('-_id title location category subcategory slug status startdate userId')
            .exec(function(error, complaints2) {
                if (error)
                    response.send(error);
                else{
                    Complaint.find({status:'Un-Resolved'})
                    .populate({
                        path:'userId',
                        select: 'profile.slug profile.username'
                    })
                    .select('-_id title location category subcategory slug status startdate userId')
                    .exec(function(error, complaints3) {
                        if (error)
                            response.send(error);
                        else{
                            response.json({
                                Pending:complaints1,
                                Resolved:complaints2,
                                Unresolved:complaints3
                            });
                        }
                        
                    });
                }
                
            });
    
        }
        
    });
};

exports.getComplaint = function(request, response) {
    Complaint.findOne({slug:request.params.cslug})
    .populate({
        path:'userId',
        select: 'profile.username profile.slug profile.firstname profile.lastname'
    })
    .populate({
        path:'comments._id',
        select: 'profile.username profile.slug'
    })
    .exec(function(error, complaint) {
        if (error)
            response.send(error);
        else if(!complaint){
            response.status(404).send('Complaint Not Found');
        }
        else {
            var follow,upvote;
            var followersCount = complaint.followers.length;
            var upvotesCount = complaint.upvotes.length;
            if(request.user){
                User.findById(request.user._id,function(err, user){
                    if(err)
                        res.send(err);
                    else if(!user){
                        var temp ={
                            followersCount: followersCount,
                            upvotesCount: upvotesCount,
                            follow: false,
                            upvote: false,
                            title: complaint.title,
                            description: complaint.description,
                            category: complaint.category,
                            subcategory: complaint.subcategory,
                            comments: complaint.comments,
                            enddate: complaint.enddate,
                            location: complaint.location,
                            userId: complaint.userId,
                            slug: complaint.slug,
                            startdate: complaint.startdate,
                            status: complaint.status
                        };
                        response.json(temp);
                    }
                    else{
                        if(complaint.followers.id(user._id)){
                            follow = true;
                            if(complaint.upvotes.id(user._id)){
                            var temp ={
                            followersCount: followersCount,
                            upvotesCount: upvotesCount,
                            follow: follow,
                            upvote: true,
                            title: complaint.title,
                            description: complaint.description,
                            category: complaint.category,
                            subcategory: complaint.subcategory,
                            comments: complaint.comments,
                            enddate: complaint.enddate,
                            location: complaint.location,
                            userId: complaint.userId,
                            slug: complaint.slug,
                            startdate: complaint.startdate,
                            status: complaint.status
                        };
                        response.json(temp);
                            }
                            else{
                            var temp ={
                            followersCount: followersCount,
                            upvotesCount: upvotesCount,
                            follow: follow,
                            upvote: false,
                            title: complaint.title,
                            description: complaint.description,
                            category: complaint.category,
                            subcategory: complaint.subcategory,
                            comments: complaint.comments,
                            enddate: complaint.enddate,
                            location: complaint.location,
                            userId: complaint.userId,
                            slug: complaint.slug,
                            startdate: complaint.startdate,
                            status: complaint.status
                        };
                        response.json(temp);
                            }
                        }
                        else{
                            follow = false;
                            if(complaint.upvotes.id(user._id)){
                            var temp ={
                            followersCount: followersCount,
                            upvotesCount: upvotesCount,
                            follow: follow,
                            upvote: true,
                            title: complaint.title,
                            description: complaint.description,
                            category: complaint.category,
                            subcategory: complaint.subcategory,
                            comments: complaint.comments,
                            enddate: complaint.enddate,
                            location: complaint.location,
                            userId: complaint.userId,
                            slug: complaint.slug,
                            startdate: complaint.startdate,
                            status: complaint.status
                        };
                        response.json(temp);
                            }
                            else{
                            var temp ={
                            followersCount: followersCount,
                            upvotesCount: upvotesCount,
                            follow: follow,
                            upvote: false,
                            title: complaint.title,
                            description: complaint.description,
                            category: complaint.category,
                            subcategory: complaint.subcategory,
                            comments: complaint.comments,
                            enddate: complaint.enddate,
                            location: complaint.location,
                            userId: complaint.userId,
                            slug: complaint.slug,
                            startdate: complaint.startdate,
                            status: complaint.status
                        };
                        response.json(temp);
                            }
                        }
                    }
                });
            }
            else{
                        var temp ={
                            followersCount: followersCount,
                            upvotesCount: upvotesCount,
                            follow: false,
                            upvote: false,
                            title: complaint.title,
                            description: complaint.description,
                            category: complaint.category,
                            subcategory: complaint.subcategory,
                            comments: complaint.comments,
                            enddate: complaint.enddate,
                            location: complaint.location,
                            userId: complaint.userId,
                            slug: complaint.slug,
                            startdate: complaint.startdate,
                            status: complaint.status
                        };
                        response.json(temp);
            }

        }
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
                         complaint.log.push({
                            entry:"Complaint Updated -"+ user.profile.username
                        });
                         for(var i = 0;i <= complaint.followers.length-1;i++){
                            User.findById(complaint.followers[i]._id,function(err, user1){
                                if(err)
                                    res.send(err);
                                else if(!user){
                                    console.log('User Not Found');
                                }
                                else{
                                    user1.log.push({
                                        entry:"Complaint Updated -"+ complaint.title
                                    });
                                }
                            });
                         };

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
        else if(!user){
            res.status(404).send('User Not Found');
        }
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
                    if(req.body.result == "true"){
                        if(complaint.followers.id(user._id)){
                            res.status(412).send('Already Followed Complaint');
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
                    else if(req.body.result == "false"){
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
                            res.status(412).send('Not Follwed Complaint');
                        }
                    }
                    else{
                        res.status(412).send('Result Not Sent');
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
        else if(!user){
            res.status(404).send('User Not Found');
        }
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
                        res.status(412).send('Already Upvoted');
                    }
                    else{
                        complaint.upvotes.push({
                            _id:user._id
                        });
                        complaint.log.push({
                            entry:"Complaint Upvoted -"+ user.profile.username
                        });
                        for(var i = 0;i <= complaint.followers.length-1;i++){
                            User.findById(complaint.followers[i]._id,function(err, user1){
                                if(err)
                                    res.send(err);
                                else{
                                    user1.log.push({
                                        entry:"Complaint Upvoted -"+ complaint.title
                                    });
                                }
                            });
                         };
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

exports.commentComplaint = function(req, res){
    User.findById(req.user._id,function(err, user){
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
                    if(req.body.description && req.body.description != ""){
                        complaint.comments.push({
                            _id:user._id,
                            description:req.body.description
                        });
                        user.log.push({
                            entry:"Comment Added -" + complaint.title
                        });
                        complaint.log.push({
                            entry:"Comment Added by -"+ user.profile.username
                        });
                        for(var i = 0;i <= complaint.followers.length-1;i++){
                            User.findById(complaint.followers[i]._id,function(err, user1){
                                if(err)
                                    res.send(err);
                                else{
                                    user1.log.push({
                                        entry:"Comment Added on -"+ complaint.title
                                    });
                                }
                            });
                         };
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
                        res.status(412).send('Send comment description');
                    }

                }
            });
        }
    });
};

exports.getComplaintLog = function(req, res){
    Complaint.findOne({
        slug:req.params.cslug},
        function(err, complaint){
            if(err)
                res.send(err);
            else if(!complaint){
                res.status(404).send('Complaint Not Found');
            }
            else{
                res.json(complaint.log);
            }
        });
};


// exports.unfollowComplaint = function(req, res){
//     User.findById(req.user._id, function(err, user){
//         if(err)
//             res.send(err);
//         else if(!user){
//             res.status(404).send('User Not Found');
//         }
//         else{
//             Complaint.findOne({
//                 slug:req.params.cslug
//             },function(err, complaint){
//                 if(err)
//                     res.send(err);
//                 else if(!complaint){
//                     res.status(404).send('Complaint Not Found');
//                 }
//                 else{
//                     if(complaint.followers.id(user._id)){
//                         complaint.followers.pull({
//                             _id:user._id
//                         });
//                         complaint.save(function(err){
//                             if(err)
//                                 res.send(err);
//                             else{
//                                 res.json({
//                                     message:'Successfully Unfollowed'
//                                 });
//                             }
//                         });
//                     }
//                     else{
//                         res.status(412).send('Not Follwed Complaint');
//                     }
//                 }
//             });
//         }
//     });
// };
