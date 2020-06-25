import mongoose from 'mongoose';
import { IObjectAny } from '../types';
import Sample from './SampleSchema';
import { storeErr } from '../utils/errors';

/*------------------
    MONGODB API
------------------*/

/**
 * MongoDB setup
 * Connect to database
 */
const mdbSetup = (): void => {
  // Address server discovery deprecation warning
  mongoose.set('useUnifiedTopology', true);
  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  const mon = mongoose.connection;
  // Capture connection errors
  mon.on('error', console.error.bind(console, 'MongoDB Connection Error. Please make sure that', process.env.MONGO_URI, 'is running.'));
  // Open connection
  mon.once('open', function () {
    console.info('Connected to MongoDB:', process.env.MONGO_URI);
  });
};


/**
 * Get samples
 * @return {Promise<IObjectAny[]>} Promise: array of sample data (promise)
 */
const getSamples = async (): Promise<IObjectAny[]> => {
  return Sample.find({}, (err, samples: IObjectAny) => {
    if (err) return storeErr(err);
    if (!samples) return storeErr('MONGODB: No samples are saved');
    return samples;
  });
}

/**
 * Save sample to store
 * @param {IObjectAny} sampleData data to save to MongoDB
 * @return {Promise<IObjectAny>} successfully saved data (promise)
 */
const saveSample = async (sampleData: IObjectAny): Promise<IObjectAny> => {
  if (!sampleData) {
    storeErr('MONGODB: No data provided to save to MongoDB');
  }
  return Sample.findOne({}, (err, sample: IObjectAny) => {
    if (err) return storeErr(err);
    const newSample = new Sample(sampleData);
    newSample.save((err) => {
      if (err) return storeErr(err);
      return newSample;
    });
  });
}

export { mdbSetup, getSamples, saveSample };
