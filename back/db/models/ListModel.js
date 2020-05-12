const mongoose = require('mongoose')

const List = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    }
});

module.exports = mongoose.model('List', List)