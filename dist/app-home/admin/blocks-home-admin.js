"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blocksHomeAdmin = void 0;
/*------------------
BLOCKS: APP HOME ADMIN
------------------*/
const _botMention = `<@${process.env.SLACK_BOT_ID}>`;
const blocksHomeAdmin = (initialChannel, initialAdmins) => {
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
    ];
};
exports.blocksHomeAdmin = blocksHomeAdmin;
//# sourceMappingURL=blocks-home-admin.js.map