var router = require('express').Router();
const Task = require('../db/models/TaskModel');
const jwt = require('jsonwebtoken');

function verifyToken(req, res) {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send('Unauthorized request');
  }
  try {
    var payload = jwt.verify(token, 'secretKey');
  } catch (err) {
    res.status(401).send('Unauthorized request');
  }
  if (!payload) {
    res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
}

//return an array of all the list of task
router.get('/', async (req, res) => {
  verifyToken(req, res);
  try {
    let task = await Task.find({ userId: req.userId }).sort('completeBefore');
    console.log(task);
    res.send(task);
  } catch (err) {
    res.status.send('Unauthorized request');
  }
});
//5ebc6cf7c578b427db464d85
//used to create a task list information ll be passed by the req.body
//save the list to the db
router.post('/', async (req, res) => {
  verifyToken(req, res);
  let newTask = new Task({
    title: req.body.title,
    desc: req.body.desc,
    userId: req.body.userId,
    completeBefore: new Date(req.body.date),
  });
  try {
    const task = await newTask.save();
    res.send(task);
  } catch (err) {
    res.send(err);
  }
});

//update a list
router.patch('/:id', (req, res) => {
  verifyToken(req, res);
  Task.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.send({ message: 'OK' });
  });
});

//delete a list of task
router.delete('/:id', (req, res) => {
  verifyToken(req, res);
  Task.findByIdAndDelete({ _id: req.params.id }).then((deletedTask) => {
    res.send(deletedTask);
  });
});

// //get all the task from a list
// router.get("/:listId/tasks", async (req, res) => {
//     try{
//         const task = await Task.find({_listId: req.params.listId})
//         res.send(task)
//     } catch(err){
//     }
// })

// //add a task to a list
// router.post("/:listId/tasks", async (req, res) => {
//     console.log(req.params)
//     let newtask = new Task({
//         title: req.body.title,
//         _listId: req.params.listId,
//         completed: false,
//     })
//     try {
//         const task = await newtask.save()
//         res.send(task);
//     } catch (err) {
//         res.sendStatus(404);
//     }
// })

// //update a task in a list
// router.patch("/tasks/:taskId", async (req, res) => {
//     Task.findOneAndUpdate(
//         {_id: req.params.taskId, _listId: req.params.listId},
//         { $set: req.body }
//     ).then(() => {
//         res.send({message: "pute"})
//     });
// })

// //delete a task from a list
// router.delete("/tasks/:taskId", (req, res) => {
//     Task.findOneAndDelete({_id: req.params.taskId, _listId: req.params.listId}
//     ).then((removedTask) => {
//         res.sendStatus(removedTask);
//     })
// })

module.exports = router;
