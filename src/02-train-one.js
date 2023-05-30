import { readObject, writeObject } from './tools/files.js';
import { getNetworkBuilder, getAndTrainNetwork } from './tools/networkTools.js';
import { log } from './tools/logger.js';
import { getSettings } from './settings.js';
import { settingsNumber } from './tools/arguments.js';

const trainMatter = await readObject('speeds.json');

const settings = getSettings();
log(`Settings[${settingsNumber}]:`, settings);

const networkBuilder = getNetworkBuilder(trainMatter, settings);
const net = getAndTrainNetwork(networkBuilder, trainMatter, settings);

await writeObject(net.toJSON(), `network_${settingsNumber}.json`);
