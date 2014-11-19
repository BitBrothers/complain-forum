var User=require('../models/user');

exports.add_user=function(req,res){

    var user = new User();
   
   user.email=req.body.email;
   user.password=req.body.password;
   user.phoneNo=req.body.phoneNo;
   user.profile.name=req.body.name;
   user.profile.gender=req.body.gender;
   user.profile.location=req.body.location;
   user.profile.website=req.body.website;
   user.profile.picture=req.body.picture;
   user.address.addressLine1=req.body.addressLine1;
   user.address.addressLine2=req.body.addressLine2;
   user.address.city=req.body.city;
   user.address.pincode=req.body.pincode;

  
    

    user.save(function(err) {
        if (err) 
        	return send(err);

        res.json({ message: 'User created!' });

    });
}


exports.update_user=function(req,res){

   User.findById(req.params.user_id, function(err, user) {
		if (err)
			res.send(err);
   

		   user.email=req.body.email;
		   user.password=req.body.password;
		   user.phoneNo=req.body.phoneNo;
		   user.profile.name=req.body.name;
		   user.profile.gender=req.body.gender;
		   user.profile.location=req.body.location;
		   user.profile.website=req.body.website;
		   user.profile.picture=req.body.picture;
		   user.address.addressLine1=req.body.addressLine1;
		   user.address.addressLine2=req.body.addressLine2;
		   user.address.city=req.body.city;
		   user.address.pincode=req.body.pincode;

		  
   

   		 user.save(function(err) {
       		 if (err) 
        	return send(err);

      		  res.json({ message: 'User updated!' });

   		 });
   	});
}

//admin

exports.getall_user=function(req, res) {
		User.find(function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	

}

exports.delete_user=function(req, res){
	User.remove({_id: req.params.user_id}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted user' });
		});
}

exports.searchuser_id=function(req, res){
	User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});

	
}

