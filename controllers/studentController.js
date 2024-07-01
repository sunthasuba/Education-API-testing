// controllers/studentController.js
const Student = require('../models/student');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('course_id');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createStudent = async (req, res) => {
    try {
      const students = req.body;
      console.log('Received student data:', students);
      if (Array.isArray(students)) {
        const createdStudents = await Student.insertMany(students);
        console.log('Created students:', createdStudents);
        res.status(201).json(createdStudents);
      } else {
        const createdStudent = await Student.create(students);
        console.log('Created student:', createdStudent);
        res.status(201).json(createdStudent);
      }
    } catch (error) {
      console.error('Error creating students:', error);
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('course_id');
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
