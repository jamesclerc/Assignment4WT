var router = require('express').Router();
const Task = require('../db/models/TaskModel');
const jwt = require('jsonwebtoken');

//function that ll verify if the auth token is here, verify the jwt token using the secret key
function verifyToken(req, res) {
  if (!req.headers || !req.headers.authorization) {
    res.status(401).send('Unauthorized request');
    return false;
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send('Unauthorized request');
    return false;
  }
  try {
    var payload = jwt.verify(token, 'secretKey');
  } catch (err) {
    res.status(401).send('Unauthorized request');
    return false;
  }
  if (!payload) {
    res.status(401).send('Unauthorized request');
    return false;
  }
  req.userId = payload.subject;
  return true;
}

//return an array of all the task for a userId
router.get('/', async (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  try {
    let task = await Task.find({ userId: req.userId }).sort('completeBefore');
    res.send(task);
  } catch (err) {
    res.status(401).send('Unauthorized request');
  }
});

//create a task for a user

router.post('/', async (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  let newTask = new Task({
    title: req.body.title,
    desc: req.body.desc,
    userId: req.body.userId,
    priority: req.body.priority,
    completeBefore: new Date(req.body.date),
  });
  try {
    const task = await newTask.save();
    res.send(task);
  } catch (err) {
    res.send(err);
  }
});

//get a task using the id of the task
router.get('/:id', async (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  console.log(req.params.id);
  try {
    let task = await Task.findById(req.params.id);
    res.send(task);
  } catch (err) {
    res.status(401).send('Unauthorized request');
  }
});

//update a task
router.patch('/:id', (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  Task.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.send({ message: 'OK' });
  });
});

//delete a task
router.delete('/:id', (req, res) => {
  isVerified = verifyToken(req, res);
  if (!isVerified) return;
  Task.findByIdAndDelete({ _id: req.params.id }).then((deletedTask) => {
    res.send(deletedTask);
  });
});

module.exports = router;
