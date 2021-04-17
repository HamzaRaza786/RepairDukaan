const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workersSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true }
});
const Workers = mongoose.model('Workers', workersSchema);

module.exports = Workers;