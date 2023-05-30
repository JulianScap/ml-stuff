import brain from 'brain.js';
import { readObject, writeObject, writeAsHtml } from './tools/files.js';
import { getNetworkBuilder, getAndTrainNetwork } from './tools/networkTools.js';
import { log } from './tools/logger.js';
import { getSettings } from './settings.js';
import { settingsNumber } from './tools/arguments.js';

const trainMatter = await readObject('speeds.json');

const settings = getSettings();
log(`Settings[${settingsNumber}]:`, settings);

const inputSize = trainMatter[0].input.length;
const outputSize = trainMatter[0].output.length;

const networkBuilder = getNetworkBuilder(settings, inputSize, outputSize);
const net = getAndTrainNetwork(networkBuilder, trainMatter, settings);

const json = net.toJSON();
await writeObject(net.toJSON(), `network_${settingsNumber}.json`);

const svg = brain.utilities.toSVG(json, {});

await writeAsHtml(svg, `index_${settingsNumber}.html`);
