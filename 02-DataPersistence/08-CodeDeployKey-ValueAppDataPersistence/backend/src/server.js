const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.get('/helth', async (req, res) => {
    res.status(200).send('OK');
});

console.log('Connecting to MongoDB...');
// MongoDB connection
mongoose.connect('mongodb://mongo:27017/keyValueDB', {
    auth: {
        username: 'key-value-user',
        password: 'key-value-password'
    },
    connectTimeoutMS: 500
})
.then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err));

