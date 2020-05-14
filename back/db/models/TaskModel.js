const mongoose = require('mongoose')

const Task = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        minlength: 1,
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completeBefore: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Task', Task)