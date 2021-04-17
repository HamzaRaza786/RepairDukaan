const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  user_type: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  join_date: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: Array, required: false }
});
const users = mongoose.model('usersSchema', usersSchema);
module.exports = users
