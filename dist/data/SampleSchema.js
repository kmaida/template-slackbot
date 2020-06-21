"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*------------------
   SAMPLE SCHEMA
------------------*/
const sampleSchema = new Schema({
    name: { type: String, required: true },
    notes: String
});
exports.default = mongoose.model('SampleSchema', sampleSchema);
//# sourceMappingURL=SampleSchema.js.map