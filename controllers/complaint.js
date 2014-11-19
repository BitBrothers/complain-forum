var Complaint = require('../models/complaint');


//user

exports.add_complaint=function(req,res){

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


exports.getall_complaints=function(req, res) {
		Complaint.find(function(err, complaint) {
			if (err)
				res.send(err);

			res.json(complaint);
		});
	

}

exports.update_complaint=function(req, res){

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

exports.searchcomplaint_id=function(req, res){
	Complaint.findById(req.params.complaint_id, function(err, complaint) {
			if (err)
				res.send(err);
			res.json(complaint);
		});

	
}






//staff

exports.delete_complaint=function(req, res){
	Complaint.remove({_id: req.params.complaint_id}, function(err, complaint) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
}

exports.staff_update_complaint=function(req, res){

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
