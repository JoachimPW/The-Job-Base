module.exports = (data, io) => {
    
    let express = require('express');
    let router = express.Router();
    var mongoose = require('mongoose')

    var Schema = mongoose.Schema;

    var Task = new Schema({
        task: String,
        done: false
    })

    var Tasks = mongoose.model('Task', Task)

    router.post("/newTask", (req, res) => {
        var newTask = new Tasks(req.body)
        newTask.save(function (err, newTask) {

            if (err) {
                return console.log(err)
            }
            io.of('/api/my_app').emit('new-data', {
                msg: 'New data is available on /api/my_data'
            });
            res.json(201, newTask)
            console.log("Det lykkedes" + newTask)
        })
    })

    /****** Routes *****/
    router.get('/', (req, res) =>
        Tasks.find({}, (err, tasks) => {
            if (err) {
                console.log(err)
            }
            res.send(tasks)
        }));

    router.get('/:id', (req, res) => {
        res.json(data.find(elm => elm.id === parseInt(req.params.id, 10)));
    });

    router.post('/', (req, res) => {
        // Finding the next available id
        const reducer = (acc, curr) => Math.max(acc, curr);
        let nextId = data.map(el => el.id).reduce(reducer) + 1;

        // Define the task object
        let task = {
            task: req.body.task, // Text of the task
            done: req.body.done, // Whether it is done or not
            id: nextId
        };
        data.push(task); // Put the new task in the data array

        // Return a message and the new task object
        res.json({ msg: "Task created", task: task });
    });

    router.put('/:id', (req, res) => {
        // Find the task given the id
        const id = parseInt(req.params.id);
        const task = data.find(elm => elm.id === id);

        // Change the task
        task.task = req.body.task;
        task.done = req.body.done;

        console.log(`Updated task`);
        console.log(task);

        // Return a message and the updated task object
        res.json({ msg: "Task updated", task: task });
    });

    return router;
};