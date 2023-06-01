import brain from 'brain.js';
import { readObject } from './tools/files.js';
import { log } from './tools/logger.js';
import { getSettings } from './settings.js';
import { round } from './tools/number.js';

log('Starting');

const settings = getSettings();

log('Reading');

const trainMatter = await readObject('speeds.json');
const testData = await readObject('test.json');

const inputSize = trainMatter[0].input.length;
const outputSize = trainMatter[0].output.length;

log('Building the FeedForward Network');

const neuronsPerLayer = round(
  (inputSize + outputSize) * settings.network.neuronRatio
);

const layers = new Array(settings.network.hiddenLayers).fill(neuronsPerLayer);

const net = new brain.FeedForward({
  inputLayer: () => brain.layer.input({ height: inputSize }),
  hiddenLayers: layers.map(
    (height) => (inputLayer) => brain.layer.feedForward({ height }, inputLayer)
  ),
  outputLayer: (inputLayer) =>
    brain.layer.target({ height: outputSize }, inputLayer),
});

log('Training');

net.train(trainMatter, {
  logPeriod: 10,
  log: (details) => log(details),
});

log('Testing');

const results = testData
  .map((item) => {
    const { input, output: expected } = item;
    const result = net.run(input);

    return {
      expected: expected[0],
      result: result[0][0],
      delta: Math.abs(expected[0] - result[0][0]),
    };
  })
  .sort((a, b) => a.delta - b.delta);

//console.table(results);

const tolerances = [0.05, 0.1, 0.2, 1 / 3];
log('------------------------------------------------');
tolerances.forEach((tolerance) => {
  const failed = results.filter((x) => x.delta > tolerance);

  log(
    `Tolerance: ${round(tolerance)} => Failed ${failed.length}/${
      results.length
    } = ${round((failed.length / results.length) * 100)}%`
  );
});

log('Done');
