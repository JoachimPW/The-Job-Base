module.exports = (Reviews) => {
    var mongoose = require('mongoose')
    let express = require('express');
    let router = express.Router();  

    var Schema = mongoose.Schema;

    var ReviewSchema = new Schema({
        title: String,
        text: String,
        username: String
    })

    var Reviews = mongoose.model('Review', ReviewSchema)

    router.post('/createReview', (req, res) => {    
        var newReview = new Reviews(req.body)
        newReview.save(function (err, newReview) {
            if (err) {
                return console.log(err)
            }

            res.json(201, newReview)
            console.log("Det lykkedes" + newReview)
        })
    })

   

  


   

       
        
   

    return router;
};