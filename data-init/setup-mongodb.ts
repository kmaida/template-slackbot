import mongoose from 'mongoose';

/*------------------
 SET UP MONGODB API
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

export { mdbSetup };
