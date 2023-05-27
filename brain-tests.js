import brain from "brain.js";
import { readObject } from "./tools/files.js";

const trainMatter = await readObject();

const net = new brain.NeuralNetwork();
net.train(trainMatter);

console.log(net.run([118, 99.82, 1]));
