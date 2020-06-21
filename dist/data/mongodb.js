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
const SampleSchema_1 = __importDefault(require("./SampleSchema"));
const errors_1 = __importDefault(require("./../utils/errors"));
/*------------------
    MONGODB API
------------------*/
const monDB = {
    /*--
    Get samples
    --*/
    getSamples() {
        return __awaiter(this, void 0, void 0, function* () {
            return SampleSchema_1.default.find({}, (err, samples) => {
                if (err)
                    return errors_1.default.storeErr(err);
                if (!samples)
                    return errors_1.default.storeErr('MONGODB: No samples are saved');
                return samples;
            });
        });
    },
    /*--
    Save sample to store
    @param: {object} sample data
    @return: {promise} saved data
    --*/
    saveSample(sampleData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!sampleData) {
                errors_1.default.storeErr('MONGODB: No data provided to save to MongoDB');
            }
            return SampleSchema_1.default.findOne({}, (err, sample) => {
                if (err)
                    return errors_1.default.storeErr(err);
                const newSample = new SampleSchema_1.default(sampleData);
                newSample.save((err) => {
                    if (err)
                        return errors_1.default.storeErr(err);
                    return newSample;
                });
            });
        });
    }
};
exports.default = monDB;
//# sourceMappingURL=mongodb.js.map