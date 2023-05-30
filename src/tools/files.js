import fs from 'fs';

const FOLDER = './data';

async function writeObject(object, fileName) {
  if (!fs.existsSync(FOLDER)) {
    await fs.promises.mkdir(FOLDER);
  }

  await fs.promises.writeFile(`${FOLDER}/${fileName}`, JSON.stringify(object));
}

async function readAllObjects(regex) {
  const files = await fs.promises.readdir(FOLDER);

  const result = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!regex.test(file)) {
      continue;
    }

    result.push({
      fileName: file,
      content: await readObject(file),
    });
  }

  return result;
}

async function readObject(fileName) {
  const content = await fs.promises.readFile(`${FOLDER}/${fileName}`);
  return JSON.parse(content);
}

async function writeAsHtml(svg, fileName) {
  const html = `<!DOCTYPE html><html><body>${svg}</body></html>`;
  await fs.promises.writeFile(`${FOLDER}/${fileName}`, html);
}

export { writeObject, readObject, writeAsHtml, readAllObjects };
