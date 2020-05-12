const mongoose = require('mongoose')

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Task', Task)