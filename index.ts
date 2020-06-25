import * as dotenv from "dotenv";
dotenv.config();
import { App } from '@slack/bolt';
// MongoDB
import { mdbSetup } from './data/data-mongodb';
import { initAdminSettings } from './app-home/admin/data-admin';
// App functionality
import modal from './modal/modal';
import submitModal from './modal/modal-view-submit';
import appHomeOpened from './app-home/event-app-home-opened';
import appMention from './app-mention/event-app-mention';
import botDM from './message-im/event-message-im';

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
initAdminSettings();

/*------------------
  SET UP MODAL IX
------------------*/
modal(app);
submitModal(app);

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
