const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/education')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
