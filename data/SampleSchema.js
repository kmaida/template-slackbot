const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*------------------
   SAMPLE SCHEMA
------------------*/

const sampleSchema = new Schema({
  name: { type: String, required: true },
  notes: String
});

module.exports = mongoose.model('SampleSchema', sampleSchema);
