const express = require('express');
const notebookRouter = express.Router();
const { AppError } = require('./appError');
const { Notebook } = require('./models.js');
const { default: mongoose } = require('mongoose');

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
notebookRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalid notebook ID', 400));
        }

        const notebook = await Notebook.findById(id);
        if (!notebook) {
            return next(new AppError('Notebook not found', 404));   
        }
        return res.status(200).json({ data: notebook });
    } catch (error) {
        next(error);
    }
});

// Update a specific notebook by ID: PUT /api/notebooks/:id
notebookRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalid notebook ID', 400));
        }
        
        const { name, description } = req.body;
        const updatedNotebook = await Notebook.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updatedNotebook) {
            return next(new AppError('Notebook not found', 404));   
        }
        return res.status(200).json({ data: updatedNotebook });
    } catch (error) {
        next(error);
    }
});

// Delete a specific notebook by ID: DELETE /api/notebooks/:id
notebookRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalid notebook ID', 400));
        }

        const deletedNotebook = await Notebook.findByIdAndDelete(id);
        if (!deletedNotebook) {
            return next(new AppError('Notebook not found', 404));   
        }
        // return res.status(200).json({ data: deletedNotebook });
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
});


module.exports = {
    notebookRouter
};
