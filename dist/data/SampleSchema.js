"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
/*------------------
   SAMPLE SCHEMA
------------------*/
const sampleSchema = new Schema({
    name: { type: String, required: true },
    notes: String
});
exports.default = mongoose_1.default.model('SampleSchema', sampleSchema);
//# sourceMappingURL=SampleSchema.js.map