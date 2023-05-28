import brain from 'brain.js';
import { readObject, writeObject } from './tools/files.js';
import NetworkTypes from './tools/NetworkTypes.js';

const { FeedForward, layer, NeuralNetwork, CrossValidate, NeuralNetworkGPU } =
  brain;
const { feedForward, target, input } = layer;

const trainMatter = await readObject('speeds.json');
const crossTrain = true;
const k = 3;
const networkType = NetworkTypes.NeuralNetwork;
const trainSettings = {
  iterations: 2000,
  logPeriod: 10,
  log: (details) => console.log(details),
};

const height = trainMatter[0].input.length;
const hiddenLayers = 10;
const options = {
  hiddenLayers: new Array(hiddenLayers).fill(height),
};

let net = null;
let buildNetwork = null;
switch (networkType) {
  case NetworkTypes.FeedForward:
    buildNetwork = () =>
      new FeedForward({
        inputLayer: () => input({ height: 3 }),
        hiddenLayers: [
          (inputLayer) => feedForward({ height: 3 }, inputLayer),
          (inputLayer) => feedForward({ height: 3 }, inputLayer),
        ],
        outputLayer: (inputLayer) => target({ height: 4 }, inputLayer),
        praxisOpts: {
          decayRate: 0.99,
        },
        sizes: [3, 3, 4],
      });
    break;

  case NetworkTypes.NeuralNetwork:
    buildNetwork = () => new NeuralNetwork(options);
    break;

  case NetworkTypes.NeuralNetworkGPU:
    buildNetwork = () => new NeuralNetworkGPU(options);
    break;
}

if (crossTrain) {
  const crossValidate = new CrossValidate(buildNetwork);
  crossValidate.train(trainMatter, trainSettings, k);

  net = crossValidate.toNeuralNetwork();
} else {
  net = buildNetwork();
  net.train(trainMatter, trainSettings);
}

const networkAsJson = net.toJSON();
await writeObject(networkAsJson, 'network.json');
