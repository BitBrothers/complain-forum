var User=require('../models/User');

exports.addUser=function(req,res){

    var user = new User();
   
   user.email=req.body.email;
   user.password=req.body.password;var User = require('../models/User');

exports.addUser = function(req, res) {

  var user = new User();

  user.email = req.body.email;
  user.password = req.body.password;
  user.phoneNo = req.body.phoneNo;
  user.profile.name = req.body.name;
  user.profile.gender = req.body.gender;
  user.profile.location = req.body.location;
  user.profile.website = req.body.website;
  user.profile.picture = req.body.picture;
  user.address.addressLine1 = req.body.addressLine1;
  user.address.addressLine2 = req.body.addressLine2;
  user.address.city = req.body.city;
  user.address.pincode = req.body.pincode;




  user.save(function(err) {
    if (err)
      return send(err);

    res.json({
      message: 'User created!'
    });

  });
}


exports.updateUser = function(req, res) {

  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);


    user.email = req.body.email;
    user.password = req.body.password;
    user.phoneNo = req.body.phoneNo;
    user.profile.name = req.body.name;
    user.profile.gender = req.body.gender;
    user.profile.location = req.body.location;
    user.profile.website = req.body.website;
    user.profile.picture = req.body.picture;
    user.address.addressLine1 = req.body.addressLine1;
    user.address.addressLine2 = req.body.addressLine2;
    user.address.city = req.body.city;
    user.address.pincode = req.body.pincode;




    user.save(function(err) {
      if (err)
        return send(err);

      res.json({
        message: 'User updated!'
      });

    });
  });
}

//admin

exports.getAllUser = function(req, res) {
  User.find(function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });


}

exports.deleteUser = function(req, res) {
  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err)
      res.send(err);

    res.json({
      message: 'Successfully deleted user'
    });
  });
}

exports.searchUserId = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });


}
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


exports.updateUser=function(req,res){

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

exports.getAllUser=function(req, res) {
		User.find(function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	

}

exports.deleteUser=function(req, res){
	User.remove({_id: req.params.user_id}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted user' });
		});
}

exports.searchUserId=function(req, res){
	User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});

	
}

