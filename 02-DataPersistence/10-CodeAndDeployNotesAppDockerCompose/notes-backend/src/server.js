const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello from Notes Backend!');
});

console.log('Connecting to MongoDB...');
console.log('Using connection string:', process.env.DB_URL);
// MongoDB connection
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => {
        console.log(`Notes API running on port ${port}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err));


