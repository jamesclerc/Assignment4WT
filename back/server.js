const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//load the router
var taskRouter = require('./controller/task.js');
var userRouter = require('./controller/user.js');

//load the db
const mongoose = require('mongoose');

var path = require('path');

//got a cors error fixed now
var cors = require('cors');

const mongodb_data = {
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  url: process.env.MONGODB_URL,
  database: process.env.MONGODB_DATABASE,
};

//connect to the DB
mongoose.connect(
  `mongodb://${mongodb_data.user}:${mongodb_data.password}@${mongodb_data.url}/${mongodb_data.database}?retryWrites=true&w=majority`,
  // `mongodb+srv://admin:admin@cluster0-khrx6.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.set('useFindAndModify', false);

//use all middleware
app.use(bodyParser.json());
app.use(cors());

//setup routers
app.use('/tasks', taskRouter);

app.use('/user', userRouter);

//listen on the port 8080
app.listen(8080, () => {
  console.log('server listening on port  8080');
});
