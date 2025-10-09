const monsoose = require('mongoose');
const Schema = monsoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    notebookId: {
         type: Schema.Types.ObjectId, 
         ref: 'Notebook',
         required: false,
         default: null
    }
},
{ 
    timestamps: true 
});
const Note = monsoose.model('Note', noteSchema);

module.exports = {
    Note
};
