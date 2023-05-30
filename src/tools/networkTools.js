import brain from 'brain.js';
import NetworkTypes from './NetworkTypes.js';

const { NeuralNetwork, NeuralNetworkGPU, CrossValidate } = brain;

function getNetworkBuilder(settings, inputSize, outputSize) {
  const { network } = settings;
  const { type, neuronRatio, hiddenLayers } = network;

  const height = Math.floor((inputSize + outputSize) * neuronRatio);

  const options = {
    hiddenLayers: Array.isArray(hiddenLayers)
      ? hiddenLayers
      : new Array(hiddenLayers).fill(height),
  };

  switch (type) {
    case NetworkTypes.NeuralNetwork:
      return () => new NeuralNetwork(options);

    case NetworkTypes.NeuralNetworkGPU:
      return () => new NeuralNetworkGPU(options);

    default:
      throw `No supported ${type}`;
  }
}

function getAndTrainNetwork(buildNetwork, trainMatter, settings) {
  const { trainSettings, crossTrainSettings } = settings;
  const { crossTrain, k } = crossTrainSettings || {};

  if (crossTrain) {
    const crossValidate = new CrossValidate(buildNetwork);
    crossValidate.train(trainMatter, trainSettings, k);

    return crossValidate.toNeuralNetwork();
  } else {
    const net = buildNetwork();
    net.train(trainMatter, trainSettings);

    return net;
  }
}

export { getNetworkBuilder, getAndTrainNetwork };
