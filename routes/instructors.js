// routes/instructors.js
const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

router.get('/', instructorController.getAllInstructors);
router.post('/', instructorController.createInstructor);
router.get('/:id', instructorController.getInstructor);
router.put('/:id', instructorController.updateInstructor);
router.delete('/:id', instructorController.deleteInstructor);

module.exports = router;
