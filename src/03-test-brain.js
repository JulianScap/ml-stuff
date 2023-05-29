import brain from 'brain.js';
import { readObject } from './tools/files.js';

const net = new brain.NeuralNetwork();
const networkAsJson = await readObject('network.json');
const testData = await readObject('test.json');

net.fromJSON(networkAsJson);

const results = testData.map((item) => {
  const { input, output: expected } = item;
  const result = net.run(input);

  return {
    expected: expected[0],
    result: result[0],
    delta: Math.abs(expected[0] - result[0]),
  };
});

const tolerances = [0.05, 0.1, 0.2, 1 / 3];

tolerances.forEach((tolerance) => {
  const failed = results.filter((x) => x.delta > tolerance);

  console.log(
    `Tolerance ${tolerance}\nFailed ${failed.length}/${results.length} = ${
      (failed.length / results.length) * 100
    }%\n`
  );
});
