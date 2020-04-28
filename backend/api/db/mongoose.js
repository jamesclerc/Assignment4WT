const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb+srv://webtechno:csCQ7VA46X9sggi@cluster0-mrbqe.mongodb.net/task?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to mongoDb success');
  })
  .catch((error) => {
    console.log(JSON.stringify(error));
  });

module.exports = { mongoose };
