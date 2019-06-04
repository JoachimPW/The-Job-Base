const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');     // Log all HTTP requests to the console
require('dotenv').config()
const path = require('path');
const app = express();
const checkJwt = require('express-jwt');    // Check for access tokens automatically
const bcrypt = require('bcrypt');           // Used for hashing passwords!
var mongoose = require('mongoose')
app.use(express.static(path.join(__dirname, '../build')));

/****** Configuration *****/
app.use(bodyParser.json());                 // Make sure all json data is parsed
app.use(morgan('combined'));         // Log all requests to the console

const port = (process.env.PORT || 8080);
console.log(process.env.JWT_SECRET)
if (!process.env.JWT_SECRET) {
    console.error('You need to put a secret in the JWT_SECRET env variable!');
    process.exit(1);
}

/****** Middleware *****/

// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

// Socket.io //

const server = app.listen(port,
    () => console.log(`Some app running on port ${port}`));
const io = require('socket.io').listen(server);

io.of('api/my_app').on('connection', function (socket) {
    socket.on('hello', function (from, msg) {
        console.log(`I received a private message from '${from}' saying '${msg}'`);
    });
    socket.on('disconnect', () => {
        console.log("Someone disconnected");
    });
});

mongoose.connect(process.env.dbUrl, (err) => {
    console.log('mongo db connection status: ', err)
})

var Schema = mongoose.Schema;

// Open paths that does not need login
let openPaths = [
    '/api/users/authenticate',
    '/http://localhost:3000/api/users/authenticate',
    '/http://localhost:8080/api/users/authenticate',
    '/api/users/create',
    '/api/jobs/newCategory',    
    '/my_app',
    '/api/jobs/categories',
    "/api/jobs/newLocation",
    "/api/jobs/locations",
    "/api/jobs/newJob",
    "/api/jobs"
];

// Validate the user using authentication
app.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path : openPaths})
);
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});


const users = [
    { id: 0, username: "krdo", password: '123'},
    { id: 1, username: "tosk", password: 'password'},
    { id: 2, username: "mvkh", password: 'l33th0xor'},
];

const data = []
let Reviews = []
let Jobs = []


/****** Routes ******/
let tasksRouter = require('./tasks_router')(data, io);
app.use('/api/tasks', tasksRouter);

// Mongoose kald ind som data - 
let usersRouter = require('./users_router')(users);
app.use('/api/users', usersRouter);

let reviewsRouter = require('./reviews_router')(Reviews);
app.use('/api/reviews', reviewsRouter)

let jobsRouter = require('./jobs_router')(Jobs);
app.use('/api/jobs', jobsRouter)

/****** Error handling ******/
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({msg: 'Something broke!'})
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });

/****** Listen ******/
// app.listen(port, () => console.log(`API running on port ${port}!`));

