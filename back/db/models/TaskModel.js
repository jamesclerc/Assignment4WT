const mongoose = require('mongoose');

//model of a task on the database
const Task = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    minlength: 1,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    default: false,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  completeBefore: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Task', Task);
