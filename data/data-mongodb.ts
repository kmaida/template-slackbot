import mongoose from 'mongoose';
import { IObjectAny } from '../types';
import Sample from './SampleSchema';
import errors from '../utils/errors';

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
 * Object containing API endpoints
 * NOTE: Not used anywhere, also needs much more robust typing
 */
const mdbApi: IObjectAny = {
  /**
   * Get samples
   * @return {Promise<IObjectAny[]>} Promise: array of sample data (promise)
   */
  async getSamples(): Promise<IObjectAny[]> {
    return Sample.find({}, (err, samples: IObjectAny) => {
      if (err) return errors.storeErr(err);
      if (!samples) return errors.storeErr('MONGODB: No samples are saved');
      return samples;
    });
  },
  /**
   * Save sample to store
   * @param {IObjectAny} sampleData data to save to MongoDB
   * @return {Promise<IObjectAny>} successfully saved data (promise)
   */
  async saveSample(sampleData: IObjectAny): Promise<IObjectAny> {
    if (!sampleData) {
      errors.storeErr('MONGODB: No data provided to save to MongoDB');
    }
    return Sample.findOne({}, (err, sample: IObjectAny) => {
      if (err) return errors.storeErr(err);
      const newSample = new Sample(sampleData);
      newSample.save((err) => {
        if (err) return errors.storeErr(err);
        return newSample;
      });
    });
  }
};

export { mdbSetup, mdbApi };
