module.exports = (Jobs) => {
    
    let express = require('express');
    let router = express.Router();
    var mongoose = require('mongoose')

    var Schema = mongoose.Schema;

    var CategorySchema = new Schema({
        title: String,
        description: String        
    })

    var LocationSchema = new Schema({
        location: String
    })

    var JobSchema = new Schema({
        title: String,
        description: String,
        category: String,
        company: String,
        email: String,
        location: String
    })

    var Job = mongoose.model("Job", JobSchema)

    var Category = mongoose.model('Category', CategorySchema)

    var Location = mongoose.model('Location', LocationSchema)

    var Jobs = []

    router.post("/newJob", (req, res) => {
        var newJob = new Job(req.body)
        newJob.save(function (err, newJob) {
            if (err) {
                console.log(err)
            }
            res.json(201, newJob)
            console.log("Job added", newJob)
        })
    })

    router.get("/", (req, res) => {
        Job.find({}, (err, jobs) => {
            if(err) {console.log(err)}
            res.send(jobs)
        })
        
    })

    router.post("/newCategory", (req, res) => {
        var newCategory = new Category(req.body)
        newCategory.save(function (err, newCategory) {
            if(err) {
                return console.log(err)
            }
            res.json(201, newCategory)
            console.log("Category added", newCategory)
        })
    })

    router.get("/locations", (req, res) => {
        Location.find({}, (err, locations) => {
            if (err){
                console.log(err)
            }
            res.send(locations)
        })
    })
    

    router.get("/categories", (req, res) => {
        Category.find({}, (err, categories) => {
            if (err){
                console.log(err)
            }
            res.send(categories)
        })
    })

    router.post("/newLocation", (req, res) => {
        var newLocation = new Location(req.body)
        newLocation.save(function (err, newLocation) {
            if (err) {
                return console.log(err)
            }
            res.json(201, newLocation)
            console.log("Loation added", newLocation)
        })
    })

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

  
    return router;
};