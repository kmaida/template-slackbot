"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const bolt_1 = require("@slack/bolt");
// Airtable
const airtable_1 = __importDefault(require("./data/airtable"));
// MongoDB
const mongodb_1 = require("./data/mongodb");
// App functionality
const modal_1 = __importDefault(require("./ix/modal"));
const modal_view_submit_1 = __importDefault(require("./ix/modal-view-submit"));
const app_home_opened_1 = __importDefault(require("./events/app-home-opened"));
const app_mention_1 = __importDefault(require("./events/app-mention"));
const message_im_1 = __importDefault(require("./events/message-im"));
/*------------------
  CREATE BOLT APP
------------------*/
const app = new bolt_1.App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});
const port = process.env.PORT || 3000;
/*------------------
    ON APP INIT
------------------*/
// Set up MongoDB store
mongodb_1.mdbSetup();
/*------------------
  SET UP MODAL IX
------------------*/
modal_1.default(app);
modal_view_submit_1.default(app, airtable_1.default);
/*------------------
  APP HOME OPENED
------------------*/
app_home_opened_1.default(app);
/*------------------
    APP MENTION
------------------*/
app_mention_1.default(app);
/*------------------
       BOT DM
------------------*/
message_im_1.default(app);
/*------------------
     START APP
------------------*/
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.start(port);
    console.log(`⚡️ TemplateSlackbot is running on ${port}!`);
}))();
//# sourceMappingURL=index.js.map