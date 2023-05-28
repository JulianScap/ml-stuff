import brain from "brain.js";
import { readObject } from "./tools/files.js";
import { getHighestKey } from "./tools/helper.js";

const net = new brain.NeuralNetwork();
const networkAsJson = await readObject("network.json");
const testData = await readObject("test.json");

net.fromJSON(networkAsJson);

const results = testData.map((item) => {
    const { input, output: expected } = item;
    const result = net.run(input);

    return {
        //input: JSON.stringify(input),
        expected: expected[0],
        result: result[0],
        delta: Math.abs(expected[0] - result[0]),
    };
});

const failed = results.filter((x) => x.delta > 0.2);
console.table(failed);

console.log(
    `Failed ${failed.length}/${results.length} = ${
        (failed.length / results.length) * 100
    }%`
);
