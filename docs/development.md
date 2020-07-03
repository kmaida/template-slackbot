# Development: Getting Started

This Slackbot template can be used to create a repo with all of the existing structure that you can then build off of to create your own full-featured Slack app.

## Prerequisites

* A Slack Workspace ([you can create one for free here](https://slack.com/get-started#/create))
* [NodeJS](https://nodejs.org/en/) (LTS recommended)
* _([node package manager (npm)](https://www.npmjs.com/get-npm); this is installed with Node, you should not need to install it separately)_
* An [Airtable](https://airtable.com) account ([you can sign up for free here](https://airtable.com/signup))
* A [MongoDB Atlas](https://mongodb.com) account ([you can sign up for free here](https://www.mongodb.com/try))
* An [ngrok](https://ngrok.com) account ([you can sign up for free here](https://dashboard.ngrok.com/signup))
* [ngrok for desktop](https://dashboard.ngrok.com/get-started/setup) (log into ngrok and then follow instructions to download the ngrok binary)

## Initial Setup

1. Use this template repo to [create your own](https://github.com/kmaida/template-slackbot/generate) or [clone the repo](https://github.com/kmaida/template-slackbot.git) to your local machine.
2. From the cloned directory, run `$ npm install` to install dependencies.
3. Remove `-sample` from the `.env-sample` filename. 
4. Open the `.env` file and add your Slack workspace name to the `SLACK_TEAM` variable (e.g., `SLACK_TEAM=kim-testing-ground`).
5. Open your Slack workspace _in the web browser_ by navigating to its URL (e.g., `https://[your-team-name].slack.com`). The URL will update automatically to look like this: `https://app.slack.com/client/[TXXXXXX]`. Copy the segment of the URL that begins with "T". This is your `SLACK_TEAM_ID`. Add it to the `.env` file.
6. Create a new channel in your Slack workspace where you'd like the bot to output notifications about new data being added. Navigate to the channel _in the web browser_. The URL will look like this: `https://app.slack.com/client/[SLACK_TEAM_ID]/[CXXXXXX]`. Copy the URL segment that begins with "C". This is your `SLACK_CHANNEL_ID`. Add it to your `.env` file. (Once we set up our Slack app, we will need to invite `@Speakerbot` into this channel so it can post there).
7. View your own user profile in Slack. You can do this by clicking the Direct Message with yourself, and then clicking on your profile image / name in the DM space. This will open your profile in a sidebar. Click on the ellipsis `... / More` item and then select **Copy member ID** from the dropdown. Paste your Slack member ID into the `.env` file as the `SLACK_ADMINS` variable. This will set you as an admin by default.

> **Note:** You will not be able to fill in the `SLACK_BOT_ID` variable in the `.env` file just yet. Don't worry, we'll get to that!

## Airtable Setup

We'll need somewhere to read and write events. At Gatsby, we use Airtable for this. Head over to the [Development: Airtable docs](development-airtable.md) to learn how to set up Airtable to work with Speakerbot.

## MongoDB Setup

Speakerbot also keeps some settings on hand; for example, the list of admin users, home views that should be updated when changes are made, the channel to post to, etc. These settings don't belong in Airtable, as they are extraneous data relevant only to the Speakerbot app. We'll use [MongoDB Atlas](https://mongodb.com) to store Speakerbot app settings.

Head to the [Development: MongoDB docs](development-mongodb.md) to set up the settings database.

## Slack App Setup

Once Airtable and MongoDB are set up, it's time to set up the Slack Application. Follow the [Development: Slack App docs](development-slack-app.md) to proceed.