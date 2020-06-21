import * as dotenv from "dotenv";
dotenv.config();
import { App } from '@slack/bolt';
// Airtable
import at from './data/airtable';
// MongoDB
import mongoose from 'mongoose';
// App functionality
import modal from './ix/modal';
import submitModal from './ix/modal-view-submit';
import appHomeOpened from './events/app-home-opened';
import appMention from './events/app-mention';
import botDM from './events/message-im';

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
modal(app);
submitModal(app, at);

/*------------------
  APP HOME OPENED
------------------*/
appHomeOpened(app);

/*------------------
    APP MENTION
------------------*/
appMention(app);

/*------------------
       BOT DM
------------------*/
botDM(app);

/*------------------
     START APP
------------------*/
(async () => {
  await app.start(port);
  console.log(`⚡️ Slackbot is running on ${port}!`);
})();
