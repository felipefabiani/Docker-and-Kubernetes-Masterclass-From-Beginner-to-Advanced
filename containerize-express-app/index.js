const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const users = [];
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World! This is a containerized Express app.');
});

// Get registered users
app.get('/users', (req, res) => {
   return res.json({ users });
});

// Register a new user
app.post('/users', (req, res) => {
    const { username, email, id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Missing user id!' });
    }

    if (users.find(user => user.id === id)) {
        return res.status(409).json({ error: 'User already exists!' });
    }
    
    users.push({ id, username, email });
    // In a real application, you would save the user to a database here
    res.status(201).json({ message: 'User created successfully', user: { id, username, email } });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});