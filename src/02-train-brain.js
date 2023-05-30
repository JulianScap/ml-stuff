import { readObject, writeObject } from './tools/files.js';
import { getNetworkBuilder, getAndTrainNetwork } from './tools/networkTools.js';
import settings from './settings.js';
import { log } from './tools/logger.js';

const trainMatter = await readObject('speeds.json');

log(`Settings:`, settings);

const networkBuilder = getNetworkBuilder(trainMatter);
const net = getAndTrainNetwork(networkBuilder, trainMatter);

await writeObject(net.toJSON(), 'network.json');
