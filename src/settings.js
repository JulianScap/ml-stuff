import NetworkTypes from './tools/NetworkTypes.js';
import { settingsNumber } from './tools/arguments.js';
import { log } from './tools/logger.js';

const settings = [
  {
    crossTrainSettings: {
      crossTrain: false,
      k: 3, // 7
    },
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: 1, // in range [1 - 3]
      neuronRatio: 2 / 3,
    },
    trainSettings: {
      iterations: 1000,
      logPeriod: 10,
      log: (details) => log(details),
      errorThresh: 10 / 1000,
    },
  },
  {
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
      iterations: 1000,
      logPeriod: 10,
      log: (details) => log(details),
      errorThresh: 10 / 1000,
    },
  },
];

function getSettings() {
  if (typeof settingsNumber === 'number') {
    return settings[settingsNumber];
  } else {
    return settings[0];
  }
}

const settingsSetSize = settings.length;

export { settingsSetSize, getSettings };
