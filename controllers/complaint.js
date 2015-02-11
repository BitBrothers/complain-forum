var Complaint = require('../models/Complaint');
var User = require('../models/User');

var slugQuery = function(slug) {
    var query = {
        $or: [{
            slug: slug
        }]
    };
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
        query.$or.push({
                _id: slug
        });
    }
    return query;
}

exports.getComplaints = function(request, response) {
    Complaint.find(function(error, complaints) {
        if (error)
            response.send(error);
        response.json(complaints);
    });
}

exports.getComplaint = function(request, response) {
    var slug = request.params.slug;
    Complaint.find(slugQuery(slug),function(error, complaint) {
        if (error)
            response.send(error);
        response.json(complaint);
    });
}

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


exports.getEditComplaint = function(request, response) {
    var slug = request.params.slug;
    Complaint.find(slugQuery(slug),function(error, complaint) {
        if (error)
            response.send(error);
        response.json(complaint);
    });
}

exports.putUpdateComplaint = function(request, response) {
    var slug = request.params.slug;
    Complaint.findOne(slugQuery(slug), function(err, complaint) {

        if (error) {
            response.status(400);
            response.end();
        } else if (!complaint) {
            response.status(404);
            response.end();
        } else {
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
    });
}

//app.delete('/complaints/:slug', complaintController.deleteComplaint);   

exports.deleteComplaint = function(request, response) {
    Complaint.remove({
            _id: request.params.complaint_id
        }, function(err, complaint) {
    if (err)
    response.send(err);

    response.json({
    message: 'Successfully deleted'
    });
    });
}


exports.searchComplaintId = function(request, response) {
  Complaint.findById(request.params.complaint_id, function(err, complaint) {
    if (err)
      response.send(err);
    response.json(complaint);
  });


}

exports.deleteComplaint = function(request, response) {
    var slug = request.params.slug;
    Complaint.find(slugQuery(slug), function(err, complaint) {
        if (err)
            response.send(err);

        response.json({
          message: 'Successfully deleted'
        });
  });
}