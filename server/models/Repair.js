const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RepairsSchema = new Schema({
    user_id: { type: String, required: true },
    worker_id: { type: String, required: true },
    location: { type: Object, required: true },
    status: { type:String , required: true },
    amount:{type:Number,required:true},
    repair_type:{type:String,required:true}
});
const Repairs = mongoose.model('Repairs', RepairsSchema);

module.exports = Repairs;