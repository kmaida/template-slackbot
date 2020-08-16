"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mdbSetup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/*------------------
 SET UP MONGODB API
------------------*/
/**
 * MongoDB setup
 * Connect to database
 */
const mdbSetup = () => {
    // Address server discovery deprecation warning
    mongoose_1.default.set('useUnifiedTopology', true);
    // Connect to MongoDB
    mongoose_1.default.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    const mon = mongoose_1.default.connection;
    // Capture connection errors
    mon.on('error', console.error.bind(console, 'MongoDB Connection Error. Please make sure that', process.env.MONGO_URI, 'is running.'));
    // Open connection
    mon.once('open', function () {
        console.info('Connected to MongoDB:', process.env.MONGO_URI);
    });
};
exports.mdbSetup = mdbSetup;
//# sourceMappingURL=setup-mongodb.js.map