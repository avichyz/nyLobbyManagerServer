var compression = require('compression');
var helmet = require('helmet');

// grab express
const express = require('express'),
  app = express(),
  port = process.env.PORT || 8081,
  mongoose = require('mongoose'),
  Announcement = require('./models/AnnouncementModel'), //created model loading here
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json());


// enabling cors -> is this sufficient? 
var cors = require('cors')
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");//http://localhost:3000");
  //res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.header('Access-Control-Allow-Headers', 'Content-Type, X-PINGOTHER, Access-Control-Allow-Origin, credentials');
  
  res.header('Content-Type', 'text/plain')
  //res.header('Content-Type', 'application/json')
  //res.write('you posted:\n')
  //res.json(req.body)
  //res.render(JSON.stringify(req.body, null, 2)) 
  next();
});

app.use(helmet());
app.use(compression()); //Compress all routes


// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin1:a221189z@ds125041.mlab.com:25041/ny_lobby'); 

// catch random errors
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//importing route
require('./routes/AnnouncementRoutes')(app);

app.listen(port);

// catch bad requests
app.use(function (req, res) {
  res.status(404).send({ path: req.originalUrl + ' not found' })
});

// send a message
console.log('Server  has started on port: ' + port);

