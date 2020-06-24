import * as dotenv from "dotenv";
dotenv.config();
import { App } from '@slack/bolt';
// Airtable
import at from './data/airtable';
// MongoDB
import { mdbSetup } from './data/mongodb';
import adminApi from './data/admin';
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
    ON APP INIT
------------------*/
// Set up MongoDB store
mdbSetup();
// Set up admin settings from environment variables
adminApi.initSettings();

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
  console.log(`⚡️ TemplateSlackbot is running on ${port}!`);
})();
