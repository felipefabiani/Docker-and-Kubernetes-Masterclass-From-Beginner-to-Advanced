const mongoose = require('mongoose');
const { AppError } = require('../appError');

function validateIdHandler(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalid ID', 400));
    }
    next();
}

module.exports = { validateIdHandler };