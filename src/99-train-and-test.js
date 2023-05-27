import brain, { CrossValidate } from "brain.js";
import { readObject } from "../tools/files.js";

const trainMatter = await readObject();
const net = new brain.NeuralNetworkGPU({
    hiddenLayers: [3],
    layers: [3],
    activation: 'sigmoid'
});
net.train(trainMatter, {
    log: (detail) => console.log(detail),
});
const testData = await readObject("test.json");

const results = testData.map((item) => {
    const { input, output: expected } = item;
    const result = net.run(input);
    return {
        input: JSON.stringify(input),
        expected: expected[0],
        result: result[0],
    };
});

console.table(results);
