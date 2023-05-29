import { readObject, writeObject } from './tools/files.js';
import { getNetworkBuilder, getAndTrainNetwork } from './tools/networkTools.js';
import settings from './settings.js';

const trainMatter = await readObject('speeds.json');

console.log(`Started at ${new Date().toLocaleString()}`);
console.log(`Settings:`);
console.log(settings);

const networkBuilder = getNetworkBuilder(trainMatter);
const net = getAndTrainNetwork(networkBuilder, trainMatter);

await writeObject(net.toJSON(), 'network.json');
