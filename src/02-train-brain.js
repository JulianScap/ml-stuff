import { readObject, writeObject } from './tools/files.js';
import { getNetworkBuilder, getAndTrainNetwork } from './tools/networkTools.js';
import settings from './settings.js';

const trainMatter = await readObject('speeds.json');

console.log(`Started at ${new Date().toLocaleString()}`);
console.log(`Creating a ${settings.network.type} with:`);
console.log(`\tHiddenLayers: ${settings.network.hiddenLayers}`);
console.log(`\tTrainingData: ${trainMatter.length}`);
console.log(
  `\tCross Validation? ${settings.crossTrainSettings.crossTrain} (K=${settings.crossTrainSettings.k})`
);

const networkBuilder = getNetworkBuilder(trainMatter);
const net = getAndTrainNetwork(networkBuilder, trainMatter);

await writeObject(net.toJSON(), 'network.json');
