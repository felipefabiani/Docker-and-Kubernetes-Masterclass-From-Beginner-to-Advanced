const express = require('express');
const { KeyValue } = require('../models/keyValue');
const { AppError } = require('../models/appError');
const storeRouter = express.Router();
storeRouter.post('/', async (req, res, next) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return next(new AppError('Key and Value are required', 400));
    }
    try {
        const existing = await KeyValue.findOne({ key });
        if (existing) {
            return next(new AppError('Key already exists. Use PUT to update.', 400));   
        }

        const newEntry = new KeyValue({ key, value });
        await newEntry.save();

        return res.status(201).send(`KeyValue { ${key}, ${value} } created successfully`);
    } catch (error) {
        next(error);
    }
});
storeRouter.get('/:key', async (req, res, next) => {
    const { key } = req.params;
    try {
        console.log(`Fetching value for key: ${key}`);
        const entry = await KeyValue.findOne({ key });
        if (!entry) {
            return next(new AppError('Key not found', 404));   
        }
        return res.status(200).json({ key: entry.key, value: entry.value });
    } catch (err) {
        next(err);
    }
});
storeRouter.put('/:key', async (req, res, next) => {
    const { key } = req.params;
    const { value } = req.body;
    if (!value) {
        return next(new AppError('Value is required', 400));
    }

    try {
        const entry = await KeyValue.findOneAndUpdate(
            { key }, 
            { value },
             { new: true });

        if (!entry) {
            return next(new AppError('Key not found', 404));   
        }
        return res.status(200).json({
            message: 'Value updated successfully',
            key: entry.key,
            value: entry.value 
        });

    } catch (error) {
       return next(error);
    }
});
storeRouter.delete('/:key', async (req, res) => {
    const { key } = req.params;
    try {
        const entry = await KeyValue.findOneAndDelete({ key });
        if (!entry) {
            return next(new AppError('Key not found', 404));
        }
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
}); 

module.exports = {
    storeRouter
}