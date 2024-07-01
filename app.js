// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');
const studentRoutes = require('./routes/students');
const instructorRoutes = require('./routes/instructors');
const enrollmentRoutes = require('./routes/enrollments');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017/education', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

module.exports = app;
