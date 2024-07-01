// routes/enrollments.js
const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.get('/', enrollmentController.getAllEnrollments);
router.post('/', enrollmentController.createEnrollment);
router.get('/:id', enrollmentController.getEnrollment);
router.put('/:id', enrollmentController.updateEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);

module.exports = router;
