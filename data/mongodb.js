const Sample = require('./SampleSchema');
const errors = require('./../utils/errors');

/*------------------
    MONGODB API
------------------*/

const monDB = {
  /*--
  Get samples
  --*/
  async getSamples() {
    return Sample.find({}, (err, samples) => {
      if (err) return errors.storeErr(err);
      if (!samples) return errors.storeErr('MONGODB: No samples are saved');
      return samples;
    });
  },
  /*--
  Save sample to store
  @Param: sample data (object)
  @Return: saved data (promise)
  --*/
  async saveSample(sampleData) {
    if (!sampleData) {
      errors.storeErr('MONGODB: No data provided to save to MongoDB');
    }
    return Sample.findOne({}, (err, sample) => {
      if (err) return errors.storeErr(err);
      const newSample = new Sample(sampleData);
      newSample.save((err) => {
        if (err) return errors.storeErr(err);
        return newSample;
      });
    });
  }
};

module.exports = monDB;
