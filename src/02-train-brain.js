import brain from "brain.js";
import { readObject, writeObject } from "./tools/files.js";
import NetworkType from "./tools/NetworkType.js";

const { FeedForward, layer, NeuralNetwork, CrossValidate } = brain;
const { feedForward, target, input } = layer;

const crossTrain = false;
const networkType = NetworkType.NeuralNetwork;

let net = null;
let buildNetwork = null;
switch (networkType) {
    case NetworkType.FeedForward:
        buildNetwork = () =>
            new FeedForward({
                inputLayer: () => input({ height: 3 }),
                hiddenLayers: [
                    (inputLayer) => feedForward({ height: 3 }, inputLayer),
                    (inputLayer) => feedForward({ height: 1 }, inputLayer),
                ],
                outputLayer: (inputLayer) => target({ height: 1 }, inputLayer),
                praxisOpts: {
                    decayRate: 0.99,
                },
            });
        break;

    case NetworkType.NeuralNetwork:
        buildNetwork = () => new NeuralNetwork();
        break;
}

const trainMatter = await readObject("speeds.json");

if (crossTrain) {
    const crossValidate = new CrossValidate(buildNetwork);

    crossValidate.train(trainMatter, {
        log: true,
    });

    net = crossValidate.toNeuralNetwork();
} else {
    net = buildNetwork();
    net.train(trainMatter, {
        logPeriod: 1000,
        log: true,
    });
}

var networkAsJson = net.toJSON();
await writeObject(networkAsJson, "network.json");
