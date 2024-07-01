// controllers/enrollmentController.js
const Enrollment = require('../models/enrollment');

exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find().populate('student_id').populate('course_id');
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEnrollment = async (req, res) => {
    try {
        const enrollments = req.body;
        console.log('Received enrollments:', enrollments);
        let result;

        if (Array.isArray(enrollments)) {
            result = await Enrollment.insertMany(enrollments);
            console.log('Inserted multiple enrollments:', result);
        } else {
            const enrollment = new Enrollment(enrollments);
            result = await enrollment.save();
            console.log('Inserted single enrollment:', result);
        }

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating enrollments:', error);
        res.status(400).json({ error: error.message });
    }
};

exports.getEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id).populate('student_id').populate('course_id');
        if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        console.log('Delete request for enrollment ID:', req.params.id);
        const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!enrollment) {
            console.log('Enrollment not found');
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        console.log('Enrollment deleted:', enrollment);
        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (error) {
        console.error('Error deleting enrollment:', error);
        res.status(500).json({ error: error.message });
    }
};

