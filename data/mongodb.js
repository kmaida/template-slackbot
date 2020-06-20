const Sample = require('./SampleSchema');

/*------------------
    MONGODB API
------------------*/

const dbErrHandler = (err) => {
  return new Error(`MONGODB Error: ${err.message || err}`);
};

const monDB = {
  /*----
    Get samples
  ----*/
  async getSamples() {
    return Sample.find({}, (err, samples) => {
      if (err) return dbErrHandler(err);
      if (!samples) return new Error('No samples are saved');
      return samples;
    });
  },
  /*----
    Save sample to store
    @Param: sample data
    @Returns: [promise] saved data
  ----*/
  async saveSample(sampleData) {
    return Sample.findOne({}, (err, sample) => {
      if (err) return dbErrHandler(err);
      if (!sampleData) return new Error('No data provided');
      const newSample = new Sample(sampleData);
      newSample.save((err) => {
        if (err) return dbErrHandler(err);
        return newSample;
      });
    });
  }
};

module.exports = monDB;
