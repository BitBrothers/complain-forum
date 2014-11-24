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
    followers: Number,
   // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comment:String

});

complaintSchema.pre('save', function(next) {
    next();
});

module.exports = mongoose.model('Complaint', complaintSchema);