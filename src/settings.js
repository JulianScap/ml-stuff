import NetworkTypes from './tools/NetworkTypes.js';
import { log } from './tools/logger.js';

const settings = {
  crossTrainSettings: {
    crossTrain: false,
    k: 3, // 7
  },
  network: {
    type: NetworkTypes.NeuralNetwork,
    hiddenLayers: 2, // in range [1 - 3]
    neuronRatio: 2 / 3,
  },
  trainSettings: {
    iterations: 20000,
    logPeriod: 10,
    log: (details) => log(details),
    errorThresh: 5 / 1000,
  },
};

export default settings;
