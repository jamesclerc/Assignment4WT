const mongoose = require('mongoose');

//model of the user on the database
const User = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model('User', User, 'users');
