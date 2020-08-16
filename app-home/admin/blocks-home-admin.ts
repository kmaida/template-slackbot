import { IObjectAny } from '../../utils/types';

/*------------------
BLOCKS: APP HOME ADMIN
------------------*/

const _botMention: string = `<@${process.env.SLACK_BOT_ID}>`;

const blocksHomeAdmin = (initialChannel: string, initialAdmins: string[]): IObjectAny[] => {
  return [
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": ":female-construction-worker: *Admin:*"
      }
    },
    {
      "type": "section",
      "block_id": "select_channel",
      "text": {
        "type": "mrkdwn",
        "text": `*Select the channel* ${_botMention} should post to when data is submitted:`
      },
      "accessory": {
        "action_id": "a_select_channel",
        "type": "channels_select",
        "initial_channel": initialChannel,
        "placeholder": {
          "type": "plain_text",
          "text": "Select a channel"
        },
        "confirm": {
          "title": {
            "type": "plain_text",
            "text": "Confirm Channel Selection"
          },
          "text": {
            "type": "mrkdwn",
            "text": `Are you sure you want to update the channel that ${_botMention} reports in? (Make sure you have added ${_botMention} to the new channel!)`
          },
          "confirm": {
            "type": "plain_text",
            "text": "Yes"
          },
          "deny": {
            "type": "plain_text",
            "text": "Nevermind"
          }
        }
      }
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": `*Important:* ${_botMention} must be added to the channel you select.`
        }
      ]
    },
    {
      "type": "section",
      "block_id": "select_admins",
      "text": {
        "type": "mrkdwn",
        "text": `*Select users with admin privileges* to control ${_botMention}:`
      },
      "accessory": {
        "action_id": "a_select_admins",
        "type": "multi_users_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select Admin Users"
        },
        "initial_users": initialAdmins
      }
    },
    // {
    //   "type": "section",
    //   "text": {
    //     "type": "mrkdwn",
    //     "text": `*Sync records from Airtable*: if you make manual updates to records _in the <https://airtable.com/${process.env.AIRTABLE_TABLE_ID}/${process.env.AIRTABLE_VIEW_ID}|Airtable itself>_, you should sync the Slack bot with Airtable afterward. Airtable does not provide a webhook or Zapier integration to push record updates, so this has to be done manually if changes are made outside of the Slack app.`
    //   },
    //   "accessory": {
    //     "type": "button",
    //     "text": {
    //       "type": "plain_text",
    //       "text": "Sync Airtable"
    //     },
    //     "action_id": "btn_sync_at"
    //   }
    // },
    // {
    //   "type": "context",
    //   "elements": [
    //     {
    //       "type": "mrkdwn",
    //       "text": `*Note:* ${_botMention} syncs with Airtable every night, but if you want to see changes instantly after making Airtable updates, you'll need to sync _manually_.`
    //     }
    //   ]
    // }
  ];
};

export { blocksHomeAdmin };
