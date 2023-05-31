import { exec, spawn } from 'node:child_process';
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
  return new Promise((resolved, rejected) => {
    const process = spawn(`yarn train-one ${parameter}`);

    process.on('exit', (number) => {
      if (number) {
        log(`Error process ${parameter}: ${number}`);
        rejected(`Error process ${parameter}: ${number}`);
        return;
      }

      resolved();
    });

    process.stdout.on('data', function(data) {
      data=data.toString();
      log(`${parameter}|${data}`);
    });

    // exec(`yarn train-one ${parameter}`, (error) => {
    //   if (error) {
    //     log(`Error process ${parameter}: ${error.message}`);
    //     rejected(error);
    //     return;
    //   }

    //   log(`Process ${parameter} completed`);

    //   resolved();
    // });
  });
}

export { spawnSubProcesses };
