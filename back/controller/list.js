var router = require('express').Router();
const List = require('./../db/models/ListModel')
const Task = require('./../db/models/TaskModel')

//return an array of all the list of task
router.get("/", async (req, res) => {
    const list = await List.find()
    res.send(list);
})

//used to create a task list information ll be passed by the req.body
//save the list to the db
router.post("/", async (req, res) => {
    let newlist = new List({
        title: req.body.title
    });
    
    try {
        const list = await newlist.save();
        res.send(list);
    } catch (err) {
        res.send(err);
    }
})

//update a list
router.patch("/:id", (req, res) => {
    List.findByIdAndUpdate({_id: req.params.id}, {
        $set: req.body
    }).then((status) => {
        res.sendStatus(200)
    });
})

//delete a list of task
router.delete("/:id", (req, res) => {
    List.findByIdAndDelete({_id: req.params.id}).then((deletedList) => {
        res.send(deletedList);
    });
})

//get all the task from a list
router.get("/:listId/tasks", async (req, res) => {
    try{
        const task = await Task.find({_listId: req.params.listId})
        res.send(task)
    } catch(err){
    } 
})

//add a task to a list
router.post("/:listId/tasks", async (req, res) => {
    console.log(req.params)
    let newtask = new Task({
        title: req.body.title,
        _listId: req.params.listId,
        completed: false,
    })
    try {
        const task = await newtask.save()
        res.send(task);
    } catch (err) {
        res.sendStatus(404);
    }
})

//update a task in a list
router.patch("/:listId/tasks/:taskId", async (req, res) => {
    Task.findOneAndUpdate(
        {_id: req.params.taskId, _listId: req.params.listId}, 
        { $set: req.body }
    ).then(() => {
        res.send({message: "pute"})
    });
})

//delete a task from a list
router.delete("/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndDelete({_id: req.params.taskId, _listId: req.params.listId}
    ).then((removedTask) => {
        res.sendStatus(removedTask);
    })
})


module.exports = router;