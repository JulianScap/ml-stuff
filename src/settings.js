import NetworkTypes from './tools/NetworkTypes.js';
import { settingsNumber } from './tools/arguments.js';
import { log } from './tools/logger.js';

const crossTrainSettings = {
  crossTrain: true,
  k: 2, // 7
};

const trainSettings = {
  iterations: 20000,
  logPeriod: 10,
  log: (details) => log(details),
  errorThresh: 10 / 1000,
};

const settings = [
  {
    crossTrainSettings,
    trainSettings,
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: 1, // in range [1 - 3]
      neuronRatio: 2 / 3,
    },
  },
  {
    crossTrainSettings,
    trainSettings,
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: 2, // in range [1 - 3]
      neuronRatio: 2 / 3,
    },
  },
  {
    crossTrainSettings,
    trainSettings,
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: 3, // in range [1 - 3]
      neuronRatio: 2 / 3,
    },
  },
  {
    crossTrainSettings,
    trainSettings,
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: [3, 2, 3], // in range [1 - 3]
      neuronRatio: 2 / 3,
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
