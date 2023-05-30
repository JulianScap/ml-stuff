import brain from 'brain.js';
import { readAllObjects, readObject } from './tools/files.js';
import { log } from './tools/logger.js';
import { round } from './tools/number.js';

const testData = await readObject('test.json');
const files = await readAllObjects(/network_[0-9]\.json/);

for (let i = 0; i < files.length; i++) {
  const { fileName, content: networkAsJson } = files[i];

  const net = new brain.NeuralNetwork();
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
  log('------------------------------------------------');
  log(`File:${fileName}`);
  tolerances.forEach((tolerance) => {
    const failed = results.filter((x) => x.delta > tolerance);

    log(
      `Tolerance: ${round(tolerance)} => Failed ${failed.length}/${
        results.length
      } = ${round((failed.length / results.length) * 100)}%`
    );
  });
}
