const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  _list_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const List = mongoose.model('Task', TaskSchema);

module.exports = { List };
