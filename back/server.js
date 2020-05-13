const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//load the router
var listRouter = require('./controller/list.js');
var userRouter = require('./controller/user.js');

const mongoose = require('mongoose');

//load the db
var path = require('path');

//got a cors error fixed now
var cors = require('cors');

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-khrx6.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(cors());

app.use('/lists', listRouter);

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(8080, () => {
  console.log('server listening on port  8080');
});
