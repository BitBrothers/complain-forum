var mongoose = require("mongoose")

var complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  subcategory: String,
  slug: String,
  status: {
    type: String,
    default: 'Open',
    index: true
  },
  startdate: {
    type: Date,
    default: Date.now
  },
  enddate: Date,
  location: String,
  followers: Number,
  // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  comment: String

});

complaintSchema.pre('save', function(next) {
    this.slug = slugify(this.title);
    next();
});

complaintSchema.index({
  status: 1
});

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