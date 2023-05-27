import fs from "fs";

const FOLDER = "./data";

async function writeObject(object, fileName = "speeds.json") {
    if (!fs.existsSync(FOLDER)) {
        fs.promises.mkdir(FOLDER);
    }

    await fs.promises.writeFile(
        `${FOLDER}/${fileName}`,
        JSON.stringify(object)
    );
}

async function readObject(fileName = "speeds.json") {
    const content = await fs.promises.readFile(`${FOLDER}/${fileName}`);
    return JSON.parse(content);
}

export { writeObject, readObject };
export default { writeObject, readObject };
