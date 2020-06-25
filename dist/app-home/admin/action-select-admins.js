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
const data_admin_1 = require("./data-admin");
/*------------------
 ACTION: SELECT ADMINS
 Admins can select
 admin users
------------------*/
const actionSelectAdmins = (app) => {
    app.action('a_select_admins', ({ action, ack, context, body }) => __awaiter(void 0, void 0, void 0, function* () {
        yield ack();
        // Set the new admins
        const newAdmins = action.selected_users;
        const settings = yield data_admin_1.setAdmins(newAdmins);
        // Update the admins in the home view for all users
        // try {
        //   const allUserHomes = await userHomeStore.getUserHomes();
        //   allUserHomes.forEach(async (userHome) => {
        //     const userHomeParams = {
        //       userID: userHome.userID,
        //       viewID: userHome.viewID,
        //       botID: context.botUserId,
        //       channel: settings.channel,
        //       admins: newAdmins
        //     };
        //     await triggerHomeViewUpdate(app, userHomeParams, at);
        //   });
        // }
        // catch (err) {
        //   errSlack(app, body.user.id, err);
        // }
    }));
};
exports.default = actionSelectAdmins;
//# sourceMappingURL=action-select-admins.js.map