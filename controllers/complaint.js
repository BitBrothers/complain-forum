var Complaint = require('../models/Complaint');
var User = require('../models/User');


exports.postAddComplaint = function(req, res) {
    console.log('ADD COMPLAINT');
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
                _id: user._id,
                entry:"Complaint Created by -"
            });
            if(req.body.anonymous == true){
                complaint.anonymous.push({
                    _id:user._id
                });
            }
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

exports.deleteComplaint = function(req, res, next) {
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
                            req.followers = complaint.followers; 
                            complaint.remove();
                            for(var i = 0;i <= req.followers.length-1;i++){
                                User.findById(req.followers[i]._id,function(err, user1){
                                    if(err)
                                        res.send(err);
                                    else if(!user){
                                        console.log('User Not Found');
                                    }
                                    else{
                                        user1.log.push({
                                            entry:"Complaint "+ complaint.title + " was deleted." 
                                        });
                                        user1.save(function(err){
                                            if(err)
                                                res.send(err);
                                        });
                                    }
                                });
                            };
                            req.del = true;
                            req.email = "Complaint -"+ complaint.title +" was deleted"
                            next();
                           
                        }
                        else if(user.role == "admin" || user.role == "staff"){
                            User.findById(complaint.userId,function(err, user){
                                if(err)
                                    res.send(err);
                                else if(!user){
                                    res.status(404).send('User Not Found');
                                }
                                else{
                                    user.complaints.pull({
                                        _id:complaint._id
                                    });
                                    req.followers = complaint.followers; 
                                    complaint.remove();
                                    for(var i = 0;i <= req.followers.length-1;i++){
                                        User.findById(req.followers[i]._id,function(err, user1){
                                            if(err)
                                                res.send(err);
                                            else if(!user){
                                                console.log('User Not Found');
                                            }
                                            else{
                                                user1.log.push({
                                                    entry:"Complaint Deleted By Admin -" + complaint.title
                                                });
                                                user1.save(function(err){
                                                    if(err)
                                                        res.send(err);
                                                });
                                                req.del = true;
                                                req.email = "Complaint -"+ complaint.title +" was deleted by Admin"
                                                next();
                                            }
                                        });
                                    };
                                    
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



exports.postGetComplaint = function(req, res, next){
    if(req.user){
         User.findById(req.user._id,function(err, user){
            if(err)
                res.send(err);
            else if(!user){
                res.status(404).send('User Not Found');
            }
            else{
                Complaint.findOne({slug:req.params.cslug},function(err, complaint){
                    if(err)
                        res.send(err);
                    else if(!complaint){
                        res.status(404).send('Complaint Not Found');
                    }
                    else{
                        if(complaint.followers.id(user._id)){
                            req.follow = true;
                        }
                        else{
                            req.follow = false;
                        }

                        if(complaint.upvotes.id(user._id)){
                            req.upvote = true;
                        }
                        else{
                            req.upvote = false;
                        }

                        if(user.complaints.id(complaint._id)){
                            next();
                        }
                        else if(user.role == "admin" || user.role == "staff"){
                            next();
                        }
                        else{
                            if(complaint.status == "new"){
                                res.status(404).send('Complaint Not Found');
                            }
                            else{
                                next();
                            }
                        }
                    }
                });
            }
        });
        
    }
    else{
       
            Complaint.findOne({slug:req.params.cslug},function(err, complaint){
            if(err)
                res.send(err);
            else if(!complaint){
                res.status(404).send('Complaint Not Found');
            }
            else{
                if(complaint.status == "new"){
                    res.status(404).send('Complaint Not Found');
                }
                else{
                    next();
                }
            }
        });
    }
};

exports.getComplaint = function(req, res) {
    Complaint.findOne({slug:req.params.cslug})
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
            res.send(error);
        else if(!complaint){
            res.status(404).send('Complaint Not Found');
        }
        else {
            var follow,upvote;
            var followersCount = complaint.followers.length;
            var upvotesCount = complaint.upvotes.length;
            
            if(complaint.anonymous.id(complaint.userId)){
                complaint.userId.profile.username = "anonymous";
                complaint.userId.profile.slug = "anonymous";
            }
            for(var i=0;i<complaint.comments.length;i++){
                if(complaint.anonymous.id(complaint.comments[i]._id)){
                    complaint.comments[i]._id.profile.username = "anonymous";
                    complaint.comments[i]._id.profile.slug = "anonymous";
                }
            };
            if(req.user){
                var temp ={
                    followersCount: followersCount,
                    upvotesCount: upvotesCount,
                    follow: req.follow,
                    upvote: req.upvote,
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
                res.json(temp);
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
                        res.json(temp);
            }

        }
    });
};


exports.putUpdateComplaint = function(req, res, next) {
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
                        if(user.complaints.id(complaint._id) || user.role == "admin" || user.role == "staff"){
                         complaint.description = req.body.description;
                         complaint.category = req.body.category;
                         complaint.subcategory = req.body.subcategory;
                         complaint.location = req.body.location;
                         complaint.log.push({
                            _id: user._id,
                            entry:"Complaint Updated -"
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
                                    user1.save(function(err){
                                        if(err)
                                            res.send(err);
                                    });
                                }
                            });
                         };

                         complaint.save(function(err, newcomplaint) {
                             if (err)
                                 res.send(err);
                            else{
                                request.update = true;
                                request.followers = newcomplaint.followers;
                                request.email = "Complaint -"+ newcomplaint.title + " was updated." + "\nUnfollow to stop recieving email notifications for this complaint" 
                                next();
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
                    if(req.body.result === true){
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
                    else if(req.body.result === false){
                        if(complaint.followers.id(user._id)){
                            complaint.followers.pull({
                                _id:user._id
                            });
                            complaint.save(function(err){
                                if(err)
                                    res.send(err);
                                else{
                                    res.json({
                                        message:'Successfully Unfollowed Complaint'
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
                            _id: user._id,
                            entry:"Complaint Upvoted -"
                        });
                        for(var i = 0;i <= complaint.followers.length-1;i++){
                            User.findById(complaint.followers[i]._id,function(err, user1){
                                if(err)
                                    res.send(err);
                                else{
                                    user1.log.push({
                                        entry:"Complaint Upvoted -"+ complaint.title
                                    });
                                    user1.save(function(err){
                                        if(err)
                                            res.send(err);
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
                            _id: user._id,
                            entry:"Comment Added by -"
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
        slug:req.params.cslug})
    .populate({
        path:'log._id',
        select: 'profile.username profile.slug'
    })
    .exec(function(err, complaint){
            if(err)
                res.send(err);
            else if(!complaint){
                res.status(404).send('Complaint Not Found');
            }
            else{
                var log = [];
                for(var i=0;i<complaint.log.length;i++){
                    if(complaint.anonymous.id(complaint.log[i]._id)){
                        log.push({
                            entry:complaint.log[i].entry + "anonymous",
                            date:complaint.log[i].date
                        });
                    }
                    else{
                        log.push({
                            entry:complaint.log[i].entry + complaint.log[i]._id.profile.username,
                            date:complaint.log[i].date
                        });
                    }
                };
                res.json(log);
            }
        });
};

exports.postFilterComplaints = function(req, res, next){
    if(req.user._id){
        User.findById(req.user._id,function(err, user){
            if(err)
                res.send(err);
            else if(!user){
                res.status(404).send('User Not Found');
            }
            else{
                if(user.role == "admin" || user.role == "staff"){
                    req.admin = true;
                    next();
                }
                else{
                    next();
                }  
            }
        });
    }
    else{
        next();
    }
};

exports.filterComplaints = function(req, res){
    if(req.admin){
    var query = Complaint.find();
    }
    else{
        var query = Complaint.find({status:{$ne:"new"}})
    }
    var key = "";

    key = req.query.keyword;
    

    if (req.query.keyword) {
    query = query.find({
      $text: {
        $search: key
      }
    })
    .skip(req.query.s)
    .limit(req.query.l);
    };

    if(req.query.status){
        if(req.query.status == "new"){
            if(req.admin){
                query = query.find({status:req.query.status});
            }
            else{
                return res.status(401).send('Unauthorized');
            }
        }
        else{
            query = query.find({status:req.query.status});
        }
        
    }
    else{
        if(req.admin){

        }
        else{
            query = query.find({status:{$ne:"new"}});
        }
    }

    if(req.query.location){
        query = query.find({location:req.query.location});
    }
    if(req.query.category){
        query = query.find({category:req.query.category});
    }
    if(req.query.subcategory){
        query = query.find({subcategory:req.query.subcategory});
    }

    

    query.populate({
        path:'userId',
        select: 'profile.username profile.slug'
    }).exec(function(err, complaints) {
    if (err) res.send(err);
    else{
        var comp = [];
        for(var i=0;i<complaints.length;i++){
            if(complaints[i].anonymous.id(complaints[i].userId)){
                complaints[i].userId.profile.slug = "anonymous";
                complaints[i].userId.profile.username = "anonymous";
                comp.push({
                    title: complaints[i].title,
                    category: complaints[i].category,
                    subcategory: complaints[i].subcategory,
                    location: complaints[i].location,
                    status: complaints[i].status,
                    userId: complaints[i].userId.profile,
                    startdate: complaints[i].startdate,
                    enddate: complaints[i].enddate,
                    slug: complaints[i].slug
                });
            }
            else{
                comp.push({
                    title: complaints[i].title,
                    category: complaints[i].category,
                    subcategory: complaints[i].subcategory,
                    location: complaints[i].location,
                    status: complaints[i].status,
                    userId: complaints[i].userId.profile,
                    startdate: complaints[i].startdate,
                    enddate: complaints[i].enddate,
                    slug: complaints[i].slug
                }); 
            }
        };
    }
    res.json(comp);
    });
};

exports.changeAnonymous = function(req, res){
    Complaint.findOne({
        slug:req.params.cslug},
        function(err, complaint){
            if(err)
                res.send(err);
            else if(!complaint){
                res.status(404).send('Complaint Not Found');
            }
            else{
                if(req.body.result === true){
                    if(complaint.anonymous.id(req.user._id)){
                        res.status(412).send('Already Anonymous');
                    }
                    else{
                        complaint.anonymous.push({
                            _id:req.user._id
                        });
                        complaint.save(function(err){
                            if(err)
                                res.send(err);
                            else{
                                res.json({
                                    message:'Successfully changed to anonymous for this complaint'
                                });
                            }
                        });
                    }
                }
                else if(req.body.result === false){
                    if(complaint.anonymous.id(req.user._id)){
                        complaint.anonymous.pull({
                            _id:req.user._id
                        });
                        complaint.save(function(err){
                            if(err)
                                res.send(err);
                            else{
                                res.json({
                                    message:'Successfully changed to normal for this complaint'
                                });
                            }
                        });
                    }
                    else{
                        res.status(412).send('Not Anonymous');
                    }
                }
                else{
                    res.status(412).send('Result Not Sent');
                }
            }
        });
};
