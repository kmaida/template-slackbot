import mongoose from 'mongoose';
import { IObjectAny } from './../types';
import Sample from './SampleSchema';
import errors from './../utils/errors';

/*------------------
    MONGODB API
------------------*/

/**
 * MongoDB setup
 */
const mdbSetup = () => {
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

const mdbApi = {
  /**
   * Get samples
   * @return {IObjectAny[]} Array of sample data (promise)
   */
  async getSamples() {
    return Sample.find({}, (err, samples: IObjectAny) => {
      if (err) return errors.storeErr(err);
      if (!samples) return errors.storeErr('MONGODB: No samples are saved');
      return samples;
    });
  },
  /**
   * Save sample to store
   * @param {IObjectAny} sampleData data to save to MongoDB
   * @return {IObjectAny} successfully saved data (promise)
   */
  async saveSample(sampleData: IObjectAny) {
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
