var mongoose = require("mongoose")
var neighbourhoodSchema = new mongoose.Schema({

  slug: String,
  location: String


});

complaintSchema.pre('save', function(next) {
  next();
});


//Slug function
function slugify(text) {

  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}


module.exports = mongoose.model('Neighbourhood', neighbourhoodSchema);



// Users Following the neighbourhood and Complaints under the neighbourhood