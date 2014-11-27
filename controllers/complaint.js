var Complaint = require('../models/Complaint');


//user


exports.addComplaint = function(req, res) {

  var complaint = new Complaint();

  complaint.title = req.body.title;
  complaint.description = req.body.description;
  complaint.category = req.body.category;
  complaint.subcategory = req.body.subcategory;
  complaint.location = req.body.location;



  complaint.save(function(err) {
    if (err)
      return send(err);

    res.json({
      message: 'Complaint created!'
    });

  });
}


exports.getallComplaints = function(req, res) {
  Complaint.find(function(err, complaint) {
    if (err)
      res.send(err);

    res.json(complaint);
  });


}

exports.updateComplaint = function(req, res) {

  Complaint.findById(req.params.complaint_id, function(err, complaint) {

    if (err)
      res.send(err);

    complaint.title = req.body.title;
    complaint.description = req.body.description;
    complaint.category = req.body.category;
    complaint.subcategory = req.body.subcategory;
    complaint.location = req.body.location;


    complaint.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Complaint updated!'
      });
    });

  });

}

exports.getComplaint = function(req, res) {

  var slug = req.params.slug; // Can be a slug or _id

  Complaint.findOne(slugQuery(slug), function(err, complaint) {
    if (err) {
      // DB Error
      res.status(400);
      res.end();
    } else if (!complaint) {
      res.status(404);
      res.end();
    } else {
      res.json(complaint);
    }
  })


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
  };
}


exports.searchComplaintId = function(req, res) {
  Complaint.findById(req.params.complaint_id, function(err, complaint) {
    if (err)
      res.send(err);
    res.json(complaint);
  });


}




//staff

exports.deleteComplaint = function(req, res) {
  Complaint.remove({
    _id: req.params.complaint_id
  }, function(err, complaint) {
    if (err)
      res.send(err);

    res.json({
      message: 'Successfully deleted'
    });
  });
}



exports.staffUpdateComplaint = function(req, res) {

  Complaint.findById(req.params.complaint_id, function(err, complaint) {

    if (err)
      res.send(err);

    complaint.title = req.body.title;
    complaint.description = req.body.description;
    complaint.category = req.body.category;
    complaint.subcategory = req.body.subcategory;
    complaint.status = req.body.status;
    complaint.location = req.body.location;


    complaint.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Complaint updated!'
      });
    });

  });


}

exports.searchStatus = function(req, res) {

console.log("sdfgds");
  Complaint.find({
    status: req.params.status
  }, function(err, complaint) {
    if (err)
      res.send(err);


    res.json(complaint);
  }); 

}

exports.searchLocation = function(req, res) {

console.log("sdfgds");
  Complaint.find({
    location: req.params.location
  }, function(err, complaint) {
    if (err)
      res.send(err);


    res.json(complaint);
  }); 

}




//admin
