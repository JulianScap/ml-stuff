import NetworkTypes from './tools/NetworkTypes.js';
import { settingsNumber } from './tools/arguments.js';
import { log } from './tools/logger.js';

const crossTrainSettings = {
  crossTrain: true,
  k: 7, // 7
};

const trainSettings = {
  iterations: 20000,
  logPeriod: 10,
  log: (details) => log(details),
  errorThresh: 2 / 1000,
};

const settings = [
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
      hiddenLayers: 4, // in range [1 - 3]
      neuronRatio: 2 / 3,
    },
  },
  {
    crossTrainSettings,
    trainSettings,
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: [50, 34, 50], // in range [1 - 3]
    },
  },
  {
    crossTrainSettings,
    trainSettings,
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: [50, 40, 34], // in range [1 - 3]
    },
  },
  {
    crossTrainSettings,
    trainSettings,
    network: {
      type: NetworkTypes.NeuralNetwork,
      hiddenLayers: [50, 40, 34, 34], // in range [1 - 3]
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
