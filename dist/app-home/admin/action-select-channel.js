"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionSelectChannel = void 0;
const errors_1 = require("../../utils/errors");
const data_admin_1 = require("./data/data-admin");
const update_view_home_1 = require("../update-view-home");
/*------------------
 ACTION: SELECT CHANNEL
 Admins can select
 reporting channel
------------------*/
const actionSelectChannel = (app, metadata) => {
    app.action('a_select_channel', ({ action, ack, context, body }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        // Set the new channel
        const newChannel = action.selected_channel;
        const settings = yield data_admin_1.setChannel(newChannel);
        // Update the reporting channel in the home view for all users
        try {
            const updateViews = yield update_view_home_1.updateAllHomes(app, metadata);
        }
        catch (err) {
            errors_1.slackErr(app, body.user.id, err);
        }
    }));
};
exports.actionSelectChannel = actionSelectChannel;
//# sourceMappingURL=action-select-channel.js.map