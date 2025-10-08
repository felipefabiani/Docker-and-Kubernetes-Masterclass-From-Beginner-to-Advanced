const express = require('express');
const storeRouter = express.Router();

// POST /store - Create or update a key-value pair
// GET /store?key=yourKey - Retrieve the value for a key
// PUT /store - Update the value for an existing key
// DELETE /store?key=yourKey - Delete a key-value pair

storeRouter.post('/', async (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) {
        return res.status(400).send('Key and value are required');
    }
    try {
        return res.status(201).send(`Key ${key} created/updated`);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});
storeRouter.get('/:key', (req, res) => {
    return res.status(200).send(`Value for key ${req.params.key}`);
});
storeRouter.put('/:key', (req, res) => {
    return res.status(200).send(`Key ${req.params.key} updated`);
});
storeRouter.delete('/:key', (req, res) => {
    return res.status(200).send(`Key ${req.params.key} deleted`);
});

module.exports = {
    storeRouter
}