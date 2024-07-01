// models/instructor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String, required: true }
});

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
