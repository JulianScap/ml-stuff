import brain from "brain.js";
import { readObject, writeObject } from "./tools/files.js";
import NetworkTypes from "./tools/NetworkTypes.js";

const { FeedForward, layer, NeuralNetwork, CrossValidate, NeuralNetworkGPU } =
    brain;
const { feedForward, target, input } = layer;

const crossTrain = true;
const k = 7;
const networkType = NetworkTypes.NeuralNetwork;
const trainSettings = {
    iterations: 2000,
    logPeriod: 10,
    log: (details) => console.log(details),
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
        buildNetwork = () => new NeuralNetwork();
        break;

    case NetworkTypes.NeuralNetworkGPU:
        buildNetwork = () => new NeuralNetworkGPU();
        break;
}

const trainMatter = await readObject("speeds.json");

if (crossTrain) {
    const crossValidate = new CrossValidate(buildNetwork);
    crossValidate.train(trainMatter, trainSettings, k);

    net = crossValidate.toNeuralNetwork();
} else {
    net = buildNetwork();
    net.train(trainMatter, trainSettings);
}

var networkAsJson = net.toJSON();
await writeObject(networkAsJson, "network.json");
