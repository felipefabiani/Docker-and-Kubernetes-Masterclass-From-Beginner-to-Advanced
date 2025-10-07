const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.get('/helth', async (req, res) => {
    res.status(200).send('OK');
});

console.log('Connecting to MongoDB...');
// MongoDB connection
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.KEY_VALUE_DB}`, {
    auth: {
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS: 5000
})
.then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err));

