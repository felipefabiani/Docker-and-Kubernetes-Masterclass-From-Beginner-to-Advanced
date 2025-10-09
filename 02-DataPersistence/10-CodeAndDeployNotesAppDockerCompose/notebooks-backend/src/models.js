const monsoose = require('mongoose');
const Schema = monsoose.Schema;

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
