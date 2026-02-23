const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { noteRouter } = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/notes', noteRouter);
app.use(errorHandler);

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


