import { IObjectAny } from './../types';
import Sample from './SampleSchema';
import errors from './../utils/errors';

/*------------------
    MONGODB API
------------------*/

const monDB = {
  /**
   * Get samples
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
   * @return {promise} successfully saved data
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

export default monDB;
