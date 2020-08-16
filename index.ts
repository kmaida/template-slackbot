import * as dotenv from 'dotenv';
dotenv.config();
import { App } from '@slack/bolt';
// MongoDB
import { mdbSetup } from './data-init/setup-mongodb';
import { initAdminSettings } from './app-home/admin/data/data-admin';
// App functionality
import { modalProfile } from './modal-profile/modal-profile';
import { submitModalProfile } from './modal-profile/modal-profile-view-submit';
import { appHomeOpened } from './app-home/event-app-home-opened';
import { appMention } from './app-mention/event-app-mention';
import { botDM } from './message-im/event-message-im';

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
modalProfile(app);
submitModalProfile(app);

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
