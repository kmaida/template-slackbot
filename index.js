require('dotenv').config();
const { App } = require('@slack/bolt');
// Airtable
const at = require('./data/airtable');
// MongoDB
const mdb = require('./data/mongodb');
const mongoose = require('mongoose');

/*------------------
  CREATE BOLT APP
------------------*/
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
const port = process.env.PORT || 3000;

/*------------------
      MONGODB
------------------*/
// Address server discovery deprecation warning
mongoose.set('useUnifiedTopology', true);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const mon = mongoose.connection;
// Capture connection errors
mon.on('error', console.error.bind(console, 'MongoDB Connection Error. Please make sure that', process.env.MONGO_URI, 'is running.'));
// Open connection
mon.once('open', function () {
  console.info('Connected to MongoDB:', process.env.MONGO_URI);
});

/*------------------
  SET UP MODAL IX
------------------*/
// require('./ix/modal')(app);
// require('./ix/modal-view-submit')(app);

// /*------------------
//   APP HOME OPENED
// ------------------*/
require('./events/app-home-opened')(app);

// /*------------------
//     APP MENTION
// ------------------*/
// require('./events/app-mention')(app);

// /*------------------
//        BOT DM
// ------------------*/
// require('./events/message-im')(app, at);

/*------------------
     START APP
------------------*/
(async () => {
  await app.start(port);
  console.log(`⚡️ Slackbot is running on ${port}!`);
})();
