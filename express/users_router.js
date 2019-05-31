module.exports = (users) => {
    var mongoose = require('mongoose')
    let express = require('express');
    let router = express.Router();

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');


    mongoose.connect(process.env.dbUrl, (err) => {
        console.log('mongo db connection status: ', err)
    })

    var Schema = mongoose.Schema;

    var User = new Schema({
        username: String,
        hash: String
    })

    var Users = mongoose.model('User', User)

    router.post('/createUser1', (req, res) => {
        const username = req.body.username;
        const hash = req.body.hash;

        var newUser = new Users(req.body)
        newUser.save(function (err, newUser) {
            if (err) {
                return console.log(err)
            }

            res.json(201, newUser)
            console.log("Det lykkedes" + newUser)
        })
    })

    router.post('/create', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, 10, function (err, hash) {
            console.log(`Hash generated for ${username}`);
            req.body.hash = hash
            var newUser = new Users(req.body, hash)
            newUser.save(function (err, newQuestion) {
                if (err) {
                    return next(err)
                }
                const payload = {
                    username: username,
                    admin: false
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                res.json({
                    msg: `User authenticated successfully' + ${hash}`,
                    token: token
                });
                console.log("New User has been added" + newQuestion);
            })
        });

    });

    router.put('/', (req, res) => {
        // TODO: Implement user update (change password, etc).
        res.status(501).json({
            msg: "PUT update user not implemented"
        });
    });

    router.post('/authenticate', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            console.error(msg);
            res.status(401).json({
                msg: msg
            });
            return;
        }

        Users.findOne({
            username: username
        }).then(function (user) {
            if (user) {
                bcrypt.compare(req.body.password, user.hash, function (err, result) {
                    if (result) {
                        const payload = {
                            username: username,
                            admin: false
                        };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, {
                            expiresIn: '1h'
                        });
                        res.json({
                            msg: 'User authenticated successfully',
                            token: token
                        });
                    } else res.status(401).json({
                        msg: "Password mismatch!"
                    })
                })
            } else {
                res.status(404).json({
                    msg: "User not found!"
                });
            }
        })
        /*
          
                Users.findOne({username: username}, (err, users) => {
                    if (err) {
                        console.log(err)
                    }   
                    res.send(users.hash)
                        
                if (users) {
                    bcrypt.compare(password, users.hash, (err, result) => {
                        if (result) {
                            const payload = {
                                username: username,
                                admin: false
                            };
                            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                                expiresIn: '1h'
                            });

                            res.json({
                                msg: 'User authenticated successfully',
                                token: token
                            });
                        } else res.status(401).json({
                            msg: "Password mismatch!"
                        })
                    });
                } else {
                    res.status(404).json({
                        msg: "User not found!"
                    });
                }
            }) */
    });

    return router;
};