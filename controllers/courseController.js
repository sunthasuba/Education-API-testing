// controllers/courseController.js
const Course = require('../models/course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create single or multiple courses
exports.createCourse = async (req, res) => {
  try {
    const courses = req.body;
    if (Array.isArray(courses)) {
      const createdCourses = await Course.insertMany(courses);
      res.status(201).json(createdCourses);
    } else {
      const createdCourse = await Course.create(courses);
      res.status(201).json(createdCourse);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single course by ID
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a course by ID
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
