// models/enrollment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollment_date: { type: Date, required: true },
    completion_status: { type: String, enum: ['enrolled', 'completed'], required: true }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;
