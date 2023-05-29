import brain from 'brain.js';
import { readObject, writeObject } from './tools/files.js';
import NetworkTypes from './tools/NetworkTypes.js';

const { FeedForward, layer, NeuralNetwork, CrossValidate, NeuralNetworkGPU } =
  brain;
const { feedForward, target, input } = layer;

const trainMatter = await readObject('speeds.json');
const crossTrain = true;
const k = 3; // 7
const networkType = NetworkTypes.NeuralNetwork;
const trainSettings = {
  iterations: 20000,
  logPeriod: 10,
  errorThresh: 2 / 1000,
  log: (details) => console.log(details),
};

const inputSize = trainMatter[0].input.length;
const outputSize = trainMatter[0].output.length;
const neuronRatio = 2 / 3;

const height = Math.floor((inputSize + outputSize) * neuronRatio);
const hiddenLayers = 3; // in range [1, 3]
const options = {
  hiddenLayers: new Array(hiddenLayers).fill(height),
};

console.log(`Creating a ${networkType} with:`);
console.log(`\tInputSize: ${inputSize}`);
console.log(`\tOutput Size: ${outputSize}`);
console.log(`\tHeight: ${height}`);
console.log(`\tHiddenLayers: ${hiddenLayers}`);

let net = null;
let buildNetwork = null;
switch (networkType) {
  case NetworkTypes.FeedForward:
    buildNetwork = () =>
      new FeedForward({
        inputLayer: () => input({ height: 50 }),
        hiddenLayers: new Array(hiddenLayers).fill((inputLayer) =>
          feedForward({ height: height }, inputLayer)
        ),
        outputLayer: (inputLayer) => target({ height: 4 }, inputLayer),
        praxisOpts: {
          decayRate: 0.99,
        },
        sizes: [inputSize, height, height],
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
