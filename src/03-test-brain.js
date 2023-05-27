import brain from "brain.js";
import { readObject } from "../tools/files.js";

const net = new brain.NeuralNetworkGPU();
const networkAsJson = await readObject("network.json");
const testData = await readObject("test.json");

net.fromJSON(networkAsJson);

const results = testData.map((item) => {
    const { input, output: expected } = item;
    const result = net.run(input);

    return {
        input: JSON.stringify(input),
        expected: JSON.stringify(expected),
        result: JSON.stringify(result),
    };
});

console.table(results);
