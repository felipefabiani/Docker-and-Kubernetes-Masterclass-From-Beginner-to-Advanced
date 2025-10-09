const monsoose = require('mongoose');
const Schema = monsoose;

const notebookSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false }
},
{ 
    timestamps: true 
});
const Notebook = monsoose.model('Notebook', notebookSchema);

module.exports = {
    Notebook
};
