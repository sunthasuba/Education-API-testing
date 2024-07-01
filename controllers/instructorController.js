// controllers/instructorController.js
const Instructor = require('../models/instructor');

exports.getAllInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.status(200).json(instructors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createInstructor = async (req, res) => {
    try {
      const instructors = req.body;
      console.log('Received instructor data:', instructors);
      if (Array.isArray(instructors)) {
        const createdInstructors = await Instructor.insertMany(instructors);
        console.log('Created instructors:', createdInstructors);
        res.status(201).json(createdInstructors);
      } else {
        const createdInstructor = await Instructor.create(instructors);
        console.log('Created instructor:', createdInstructor);
        res.status(201).json(createdInstructor);
      }
    } catch (error) {
      console.error('Error creating instructors:', error);
      res.status(500).json({ error: error.message });
    }
  };

exports.getInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findById(req.params.id);
        if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
        res.status(200).json(instructor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
        res.status(200).json(instructor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteInstructor = async (req, res) => {
    try {
        const instructor = await Instructor.findByIdAndDelete(req.params.id);
        if (!instructor) return res.status(404).json({ error: 'Instructor not found' });
        res.status(204).json({ message: 'instructor record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
