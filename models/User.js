var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto'); 

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  
  password: String,
  role: {type: String,default:'citizen',lowercase: true},
  complaints:[{
    _id:{type: mongoose.Schema.Types.ObjectId, ref: 'Complaint'}
  }],
  log:[{
    _id: false,
    entry: String,
    date:{type: Date, default: Date.now}
  }],
    facebook: String,
    twitter: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    tokens: Array,
  
  profile: {
    joinDate:{type: Date,default: Date.now()},
    slug: String,
    username: String,
    firstname: {
      type: String,
      default: ''
    },
    lastname: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    website: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      default: ''
    }

  },
    location: String,
    pincode: Number,
    phoneNo: Number,
  resetPasswordToken: String,
resetPasswordExpires: Date


});

//Slug function
function slugify(text) {
console.log(text);
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};



userSchema.pre('save', function(next) {
  var user = this;
  if(user.profile.slug == null || user.profile.slug == undefined){
  user.profile.slug = slugify(user.profile.username + Math.floor((Math.random() * 100) + 1));
  }
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);


