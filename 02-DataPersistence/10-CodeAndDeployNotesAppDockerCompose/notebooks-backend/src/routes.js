const express = require('express');
const notebookRouter = express.Router();

notebookRouter.get('/', (req, res) => {
    res.send('Get all notebooks');
});

notebookRouter.post('/', (req, res) => {
    res.send('Create a new notebook');
});

module.exports = {
    notebookRouter
};
