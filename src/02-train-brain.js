import brain from "brain.js";
import { readObject, writeObject } from "../tools/files.js";

const config = {
    activation: "sigmoid", // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
};

const trainMatter = await readObject();
const crossValidate = new brain.CrossValidate(
    () => new brain.NeuralNetwork(config)
);
crossValidate.train(trainMatter, {
    logPeriod: 1000,
    log: (detail) => console.log(detail),
});

const net = crossValidate.toNeuralNetwork();

//const net = new brain.NeuralNetwork();
// net.train(trainMatter, {
//     logPeriod: 1000,
//     log: (detail) => console.log(detail),
// });

var networkAsJson = net.toJSON();
await writeObject(networkAsJson, "network.json");
