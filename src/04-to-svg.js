import brain from 'brain.js';
import { readAllObjects, writeAsHtml } from './tools/files.js';

const files = await readAllObjects(/network_[0-9]+.json/);

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const svg = brain.utilities.toSVG(file.content, {
    height: 500,
    width: 500,
  });

  await writeAsHtml(svg, `index_${file.fileName.replace(/[^0-9]/g, '')}.html`);
}
