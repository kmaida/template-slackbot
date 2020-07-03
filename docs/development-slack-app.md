# Development: Slack App Setup

It's time to set up our new Slack app. We'll need credentials from the Slack app in order to set our environment variables for the app's code to run properly.

## Slack App Settings

1. Make sure you're signed into your new Slack workspace.
2. Go to the [Slack App API](https://api.slack.com/apps) and click the **Create New App** button.
3. Name your app `[Your App Name]` and select your Development Slack Workspace. Click **Create App**.
4. Next, follow the steps below going section-by-section through the Slack App settings and features:

### Basic Information

**App Credentials**

* Copy the **App ID** and add it to your `.env` file's `SLACK_APP_ID`.
* Copy the **Signing Secret** and add it to your `.env` file's `SLACK_SIGNING_SECRET`.

**Display Information**

You'll need to give your app a name and short description. You can also provide an app icon and background color if you wish.

### App Home

**Your App's Presence in Slack**

You can modify your app's display name and bot name here.

* Always Show My Bot as Online: `on`

**Show Tabs**

* Home Tab: `on`
* Messages Tab: `on`

### Incoming Webhooks

**Activate Incoming Webhooks**: `on`

## Install Slack App

At this point, we need to install our Slack app to our Slack workspace to generate a bot token. Go to the **Install App** sidebar item in your Slack App Settings and click the **Install App** button.

You will receive a prompt telling you that Speakerbot is requesting permission to access your workspace. You may also be prompted to choose the channel that Speakerbot posts to. Select the channel you created in the [Initial Setup](development.md#initial-setup) section.

Click **Allow** to install the application. You will then have a **Bot User OAuth Access Token** available in the **Install App** section of your Slack App Settings. Copy this token and paste it into your `.env` file's `SLACK_BOT_TOKEN` variable.

## Start App Server and Ngrok Tunnel

At this point, you'll need to **start your app server and use [ngrok](https://ngrok.com) to provide a publicly-available forwarding tunnel** so you can finish adding your app's settings in Slack.

In your terminal or command prompt, navigate to the root directory of the folder where you've cloned the source code for this repository. Then run:

```
$ npm start
```

Next, start ngrok, forwarding to the localhost port that your app is running on (`8787` by default):

```
$ [./your/path/to/]ngrok http 8787
```

This will create a tunnel to your app on localhost. You can then access the app publicly in the browser at the URL provided by ngrok when the tunnel is created.

> **Note:** On a free plan, this URL will be different every time you restart ngrok. If you'd like to use a subdomain or reserve a domain to use all the time, you'll need to [upgrade to a paid plan](https://ngrok.com/pricing). I use and like the Basic plan, which is $5/month at the time of this writing, and provides custom subdomains and 3 reserved domains per user.

## Finish Slack App Setup

Now that you have a tunnel pointing to your Slack app code, you can finish setting up the Slack App in Slack's API. In your app's Slack App Settings, do the following in each named section:

### Interactivity & Shortcuts

**Interactivity**: `on`

* Request URL: `https://[your-ngrok-tunnel]/slack/events`

**Shortcuts**

Create a new _global_ shortcut:

* Name: `Add Profile`
* Short Description: `Add profile data to Airtable`
* Callback ID: `add_profile`

### Slash Commands

Create a new command:

* Command: `/profile`
* Request URL: `https://[your-ngrok-tunnel]/slack/events`
* Short Description: `Add profile data to Airtable`
* Escape channels, users, and links sent to your app: `off`

### OAuth & Permissions

**OAuth Tokens & Redirect URLs**

The `Bot User OAuth Access Token` is available here. You should have already pasted it into your `.env` file as `SLACK_BOT_TOKEN` when [installing the app](#install-slack-app).

**Scopes**

Add the following Bot Token OAuth Scopes / make sure these scopes are present:

* `app_mentions:read`
* `chat:write`
* `commands`
* `im:history`
* `incoming-webhook`
* `users.profile:read`
* `users:read`
* `users:read.email`

> **Note:** Changing permissions / scopes will cause Slack to instruct you to re-install your Slack app. Do so whenever prompted.

Once you've added a user scope and reinstalled the app, you'll also see an **OAuth Access Token** listed at the top of this section. Copy the token into your `.env` in the `SLACK_OAUTH_TOKEN` variable.

### Event Subscriptions

**Enable Events**: `On`

* Request URL: `https://[your-ngrok-tunnel]/slack/events`

Once the Request URL has been added, Slack will verify that the endpoint responds promptly. This is why we needed to have our Speakerbot app code running on a publicly-accessible server. If Slack cannot verify the Request URL, it won't let you subscribe to bot events.

**Subscribe to bot events**

Add the following Bot User Events:

* `app_home_opened`
* `app_mention`
* `message.im`

## Slack Bot User ID

You may have noticed that there's still a Slack environment variable missing from the `.env` file: `SLACK_BOT_USER_ID`. This one requires a code change. You cannot retrieve the bot's member ID the way you can get a human user's ID because Speakerbot is actually an _app_, so all of its information displayed in Slack's interface is related to the app itself rather than the bot user member.

To find the Slack Bot User ID, open the `/events/app-home-opened.js` file. Find this block of code in the file:

```js
/**
 * Find the bot user ID to set in .env:
 * Uncomment the following line
 * Open the App Home, and check console logs
 */
// console.log('Bot User ID:', context.botUserId);
```

1. Uncomment the line with the `console.log`.
2. Restart the Node Slackbot server with `Ctrl + c` followed by `$ npm start`.
3. In your Slack workspace, find **Apps** in the sidebar and click the `+` to add an app.
4. Find your Slack app in the Apps listing and click on it to add the bot to the sidebar.

This will open the bot's App Home, which will trigger the `app_home_opened` event and run the code containing the `console.log` that was just uncommented. In your terminal, you should see the bot user ID outputted to the logs.

Copy the bot user ID and add it to the `.env` file's `SLACK_BOT_USER_ID` variable. You can then comment out the `console.log` again.

Stop and restart the Node server again to propagate the changes to environment settings:

```
Ctrl + c
$ npm start
```

## Congratulations!

You're now ready to use the your app with an active Slack workspace. For production deployment instructions, see [Deployment](deployment.md).