import brain from "brain.js";
import { readObject, writeObject } from "../tools/files.js";

const crossTrain = false;

const buildNetwork = () => new brain.NeuralNetworkGPU();
let net = null;

const trainMatter = await readObject("speeds.json");

if (crossTrain) {
    const crossValidate = new brain.CrossValidate(buildNetwork);

    crossValidate.train(trainMatter, {
        logPeriod: 1000,
        log: (detail) => console.log(detail),
    });

    net = crossValidate.toNeuralNetwork();
} else {
    net = buildNetwork();
    net.train(trainMatter, {
        logPeriod: 1000,
        log: (detail) => console.log(detail),
    });
}

var networkAsJson = net.toJSON();
await writeObject(networkAsJson, "network.json");
