var mongoose=require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
/*
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  tokens: Array,
*/
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },

  address : {
      addressLine1 : String,
      addressLine2 : String,
      city : String,
      pincode : Number
  },
  phoneNo : Number,
  
  //following:[{complaintID:{type:mongoose.Schema.Types.ObjectId, ref: 'Complaint'}}]

  // resetPasswordToken: String,
  // resetPasswordExpires: Date

  
});



userSchema.pre('save', function(next) {
    next();
});


module.exports = mongoose.model('User', userSchema);