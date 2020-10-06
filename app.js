const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cron = require("node-cron");

const Members = require('./api/routes/members');

// to parse body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors allow
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
  
// mongo db connections
mongoose.connect( process.env.mongoURI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/uploads', express.static('uploads'))
app.use('/members', Members);
app.get('/', function (req, res) {
  res.send('Hello World!')

});
cron.schedule('*/3 * * * * *', function () {
  console.log('running a task every second');
  // getTweetData();
});
module.exports = app;
