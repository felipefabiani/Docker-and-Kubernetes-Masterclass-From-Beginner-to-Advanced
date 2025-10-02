import express from 'express';
// const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('hello from express'));

app.listen(port, () => {
    console.log(`Server listening on : ${port}`)
})