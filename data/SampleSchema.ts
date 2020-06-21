import mongoose from 'mongoose';
const Schema = mongoose.Schema;

/*------------------
   SAMPLE SCHEMA
------------------*/

const sampleSchema = new Schema({
  name: { type: String, required: true },
  notes: String
});

export default mongoose.model('SampleSchema', sampleSchema);
