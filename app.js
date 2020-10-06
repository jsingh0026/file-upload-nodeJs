const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cron = require("node-cron");
const fetch = require("node-fetch");
const update = require('./updateBio')

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

const getTweetData = () => {
  fetch(
  "https://api.twitter.com/2/tweets?ids=1295799129310769152&tweet.fields=public_metrics",
  {
    method: "GET",
    headers: { Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAAWEIAEAAAAApcVo%2BMmoVPNc59sjMBYSISJekYQ%3Dfy8BIhDS2Qh4Lqw1mhRqnZx88KS9bHN2wzbXDi0WvJhydUTmWg` },
  }
).then((response) => response.json())
.then((json) => {
const { retweet_count, reply_count, like_count, quote_count } = json.data[0].public_metrics;
  var bio = `
Developer @GeekyAnts
`;
update(bio);
  console.log(json.data[0].public_metrics);
})
.catch((error) => {
  console.log({ error });
});
}
app.use('/uploads', express.static('uploads'))
app.use('/members', Members);
app.get('/', function (req, res) {
  res.send('Hello World!')

});
cron.schedule('*/3 * * * * *', function () {
  console.log('running a task every second');
  getTweetData();
});
module.exports = app;
