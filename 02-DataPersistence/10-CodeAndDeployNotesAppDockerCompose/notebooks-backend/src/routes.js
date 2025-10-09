const express = require('express');
const notebookRouter = express.Router();
const { AppError } = require('./appError');
const { Notebook } = require('./models.js');

// Create new notebook: POST /api/notebooks
notebookRouter.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return next(new AppError('Name is required', 400));
        }
        
        const newNotebook = new Notebook({ name, description });
        const notebookExists = await Notebook.findOne({ name });
        if (notebookExists) {
            return next(new AppError('Notebook with this name already exists', 400));
        }

        await newNotebook.save();
        return res.status(201).json({ data: newNotebook});
    } catch (error) {
        next(error);
    }
});

// Get all notebooks: GET /api/notebooks
notebookRouter.get('/', async (req, res, next) => {
    try {
        const notebooks = await Notebook.find();
        return res.status(200).json({ data: notebooks });
    } catch (error) {
        next(error);
    }
});

// Get a specific notebook by ID: GET /api/notebooks/:id
notebookRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Get notebook with ID: ${id}`);
});

// Update a specific notebook by ID: PUT /api/notebooks/:id
notebookRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Update notebook with ID: ${id}`);
});

// Delete a specific notebook by ID: DELETE /api/notebooks/:id
notebookRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Delete notebook with ID: ${id}`);
});


module.exports = {
    notebookRouter
};
