var Complaint = require('../models/Complaint');


//user

exports.addComplaint=function(req,res){

    var complaint = new Complaint();
   
    complaint.title=req.body.title;
    complaint.description=req.body.description;
    complaint.category=req.body.category;
    complaint.subcategory=req.body.subcategory;
  
    

    complaint.save(function(err) {
        if (err) 
        	return send(err);

        res.json({ message: 'Complaint created!' });

    });
}


exports.getallComplaints=function(req, res) {
		Complaint.find(function(err, complaint) {
			if (err)
				res.send(err);

			res.json(complaint);
		});
	

}

exports.updateComplaint=function(req, res){

		Complaint.findById(req.params.complaint_id, function(err, complaint) {

			if (err)
				res.send(err);

			 complaint.title=req.body.title;
   			 complaint.description=req.body.description;
  			 complaint.category=req.body.category;
   			 complaint.subcategory=req.body.subcategory; 	
   			 complaint.location=req.body.location;


			complaint.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Complaint updated!' });
			});

		});

}

exports.searchComplaintId=function(req, res){
	Complaint.findById(req.params.complaint_id, function(err, complaint) {
			if (err)
				res.send(err);
			res.json(complaint);
		});

	
}






//staff

exports.deleteComplaint=function(req, res){
	Complaint.remove({_id: req.params.complaint_id}, function(err, complaint) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
}

exports.staffUpdateComplaint=function(req, res){

Complaint.findById(req.params.complaint_id, function(err, complaint) {

			if (err)
				res.send(err);

			 complaint.title=req.body.title;
   			 complaint.description=req.body.description;
  			 complaint.category=req.body.category;
   			 complaint.subcategory=req.body.subcategory; 
   			 complaint.status=req.body.status;
   			 complaint.location=req.body.location;


			complaint.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Complaint updated!' });
			});

			});


}





//admin
