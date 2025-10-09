const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const { AppError } = require('./appError');
const { Note } = require('./models.js');
const { validateIdHandler } = require('./middlewares/validateIdHandler.js');

const notebookServiceUrl = process.env.NOTEBOOKS_API_URL;
const noteRouter = express.Router();
// Create new note: POST /api/notes
noteRouter.post('/', async (req, res, next) => {
    try {
        const { title, content, notebookId } = req.body;
        let validatedNotebookId = null;
        if (!validatedNotebookId) {
            console.info({
                message: 'Notebook Id note provided. Storing note without notebook association.'
            });
        } else if (!mongoose.Types.ObjectId.isValid(notebookId)) {
            return next(new AppError('Invalid notebookId format', 400));
        } else {
            try {
                await axios.get(`${notebookServiceUrl}${notebookId}`);
            } catch (error) {
                const jsonError = error.toJSON();
                if (jsonError.status === 404) {
                    return next(new AppError('Notebook with provided ID does not exist', 400));
                } else {
                    console.error({
                        message: 'Error validating notebookId:',
                        notebookId,
                        error: error.message
                    });
                }
             } finally {
                validatedNotebookId = notebookId;
             }
        }


        if (!title || !content) {
            return next(new AppError("'Title', 'content' fields are required", 400));
        }
        
        const newNote = new Note({ title, content });
        const noteExists = await Note.findOne({ title, content });
        if (noteExists) {
            return next(new AppError('Note with this title and content already exists', 400));
        }

        await newNote.save();
        return res.status(201).json({ data: newNote});
    } catch (error) {
        next(error);
    }
});

// Get all notes: GET /api/notes
noteRouter.get('/', async (req, res, next) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({ data: notes });
    } catch (error) {
        next(error);
    }
});

// Get a specific note by ID: GET /api/notes/:id
noteRouter.get('/:id', validateIdHandler, async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return next(new AppError('Note not found', 404));   
        }
        return res.status(200).json({ data: note });
    } catch (error) {
        next(error);
    }
});

// Update a specific note by ID: PUT /api/notes/:id
noteRouter.put('/:id', validateIdHandler, async (req, res, next) => {
    try {
        const { title, content, notebookId } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, notebookId },
            { new: true }
        );
        if (!updatedNote) {
            return next(new AppError('Note not found', 404));   
        }
        return res.status(200).json({ data: updatedNote });
    } catch (error) {
        next(error);
    }
});

// Delete a specific note by ID: DELETE /api/notes/:id
noteRouter.delete('/:id', validateIdHandler, async (req, res, next) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return next(new AppError('Note not found', 404));   
        }
        // return res.status(200).json({ data: deletedNote });
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
});


module.exports = {
    noteRouter
};
