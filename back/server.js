const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
//load the router
var listRouter = require('./controller/list.js');
var userRouter = require('./controller/user.js');

const mongoose = require('mongoose');

//load the db
var path = require('path');

//got a cors error fixed now
var cors = require('cors');

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
  next();
}

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
