var mongoose = require("mongoose")

var complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  subcategory: String,
  slug: String,
  featured: {type:Boolean,default:false},
  status: {
    type: String,
    default: 'new',
    index: true,
    lowercase: true
  },
  startdate: {
    type: Date,
    default: Date.now
  },
  followers: [{
    _id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  //to keep track of upvotes
  upvotes: [{
    _id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  comments: [{
    _id:{type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    description: String,
    date: {type: Date, default: Date.now}
  }],
  log:[{
    _id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    entry: String,
    date:{type: Date, default: Date.now}
  }],
  anonymous:[{
    _id:{type: mongoose.Schema.Types.ObjectId, ref:'User'}
  }],
  enddate: Date,
  location: String,
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});

complaintSchema.pre('save', function(next) {
    var complaint = this;
    if(complaint.slug == null || complaint.slug == undefined){
      complaint.slug = slugify(complaint.title + Math.floor((Math.random() * 100) + 1));
    }
    next();
});

complaintSchema.index({
  status: 1
});

complaintSchema.index({ 
  title : 'text',
  status : 'text',
  category: 'text',
  subcategory: 'text',
  location: 'text'
}, {weights:{title:1, status:1}});

//Slug function
function slugify(text) {

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};


module.exports = mongoose.model('Complaint', complaintSchema);