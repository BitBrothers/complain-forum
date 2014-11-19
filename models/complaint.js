var mongoose=require("mongoose")

var complaintSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    subcategory: String,
    status: {type:String, default: 'Open'},
    startdate: {type:Date, default: Date.now },
    enddate: Date,
    location: String,
    followers: String,
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment: Array

});

complaintSchema.pre('save', function(next) {
    next();
});

module.exports = mongoose.model('Complaint', complaintSchema);