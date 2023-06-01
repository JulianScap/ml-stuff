import { spawn } from 'node:child_process';
import { settingsSetSize } from '../settings.js';
import { log } from './logger.js';

async function spawnSubProcesses() {
  const promises = [];

  log(`Starting ${settingsSetSize} subprocesses`);
  for (let i = 0; i < settingsSetSize; i++) {
    const promise = execSubProgram(i);
    promises.push(promise);
  }

  log('Waiting');
  await Promise.all(promises);
  log('Done!');
}

function execSubProgram(parameter) {
  return new Promise((resolved, _rejected) => {
    const process = spawn('node', ['./src/02-train-one.js', `${parameter}`], {
      shell: true,
    });

    process.on('exit', (number) => {
      if (number) {
        log(`Error process ${parameter}: ${number}`);
      }

      resolved();
    });

    process.stdout.on('data', function (data) {
      data = data.toString();
      log(`${parameter}|${data}`.trimEnd());
    });
  });
}

export { spawnSubProcesses };
