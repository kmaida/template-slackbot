"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSample = exports.getSamples = exports.mdbSetup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SampleSchema_1 = __importDefault(require("./SampleSchema"));
const errors_1 = require("../utils/errors");
/*------------------
    MONGODB API
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
/**
 * Get samples
 * @return {Promise<IObjectAny[]>} Promise: array of sample data (promise)
 */
const getSamples = () => __awaiter(void 0, void 0, void 0, function* () {
    return SampleSchema_1.default.find({}, (err, samples) => {
        if (err)
            return errors_1.storeErr(err);
        if (!samples)
            return errors_1.storeErr('MONGODB: No samples are saved');
        return samples;
    });
});
exports.getSamples = getSamples;
/**
 * Save sample to store
 * @param {IObjectAny} sampleData data to save to MongoDB
 * @return {Promise<IObjectAny>} successfully saved data (promise)
 */
const saveSample = (sampleData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!sampleData) {
        errors_1.storeErr('MONGODB: No data provided to save to MongoDB');
    }
    return SampleSchema_1.default.findOne({}, (err, sample) => {
        if (err)
            return errors_1.storeErr(err);
        const newSample = new SampleSchema_1.default(sampleData);
        newSample.save((err) => {
            if (err)
                return errors_1.storeErr(err);
            return newSample;
        });
    });
});
exports.saveSample = saveSample;
//# sourceMappingURL=data-mongodb.js.map